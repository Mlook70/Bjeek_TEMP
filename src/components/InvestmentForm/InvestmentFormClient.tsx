'use client'
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, User, Phone, Package, MapPin, Calculator, Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useGTMAnalytics } from '@/hooks/useGTMAnalytics';

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  sharesQuantity?: string;
  city?: string;
}

// Helper to convert Arabic numerals to English numerals
const toEnglishDigits = (str: string) =>
  str.replace(/[٠-٩]/g, d => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);

// Helper to format numbers with English locale
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Dynamic pricing based on investment tiers
const getDynamicSharePrice = (quantity: number): number => {
  if (quantity >= 1000000) return 3.30; // الذهبية
  if (quantity >= 500000) return 3.40;  // البلاتينية
  if (quantity >= 350000) return 3.50;  // الماسية
  if (quantity >= 250000) return 3.60;  // الذهبية
  if (quantity >= 120000) return 3.70;  // الفضية
  if (quantity >= 50000) return 3.80;   // البرونزية
  if (quantity >= 15000) return 3.90;   // المتقدمة
  return 4.00; // الأساسية (5000+)
};

// Get discount percentage based on quantity
const getDiscountPercentage = (quantity: number): number => {
  const originalPrice = 4.00;
  const discountedPrice = getDynamicSharePrice(quantity);
  if (discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

const InvestmentFormClient: React.FC = () => {
  const analytics = useGTMAnalytics();
  const t = useTranslations('investmentForm');
  const locale = useLocale();
  
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    sharesQuantity: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasStartedForm, setHasStartedForm] = useState(false);

  useEffect(() => {
    const pageTitle = locale === 'ar' ? 'نموذج الاستثمار - بجيك' : 'Investment Form - Bjeek';
    analytics.trackPageView('investment_form', pageTitle);
  }, [analytics, locale]);

  // Validation functions
  const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) return t('fullName.required');
    if (name.trim().length < 3) return t('fullName.minLength');
    if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(name.trim())) return t('fullName.invalid');
    return undefined;
  };

  const validatePhoneNumber = (phone: string): string | undefined => {
    if (!phone.trim()) return t('phoneNumber.required');
    const cleanPhone = toEnglishDigits(phone.replace(/[\s\-()]/g, ''));
    if (!/^(\+966|966|05|5)?[0-9]{8,9}$/.test(cleanPhone)) {
      return t('phoneNumber.invalid');
    }
    return undefined;
  };

  const validateSharesQuantity = (shares: string): string | undefined => {
    if (!shares || shares.toString().trim() === '') return t('sharesQuantity.required');
    const sharesNum = parseInt(toEnglishDigits(shares.toString()));
    if (isNaN(sharesNum) || sharesNum <= 0) return t('sharesQuantity.invalid');
    if (sharesNum < 5000) return t('sharesQuantity.minInvestment');
    return undefined;
  };

  const validateCity = (city: string): string | undefined => {
    if (!city.trim()) return t('city.required');
    if (city.trim().length < 2) return t('city.minLength');
    if (!/^[\u0600-\u06FFa-zA-Z\s\-]+$/.test(city.trim())) return t('city.invalid');
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    newErrors.fullName = validateFullName(form.fullName);
    newErrors.phoneNumber = validatePhoneNumber(form.phoneNumber);
    newErrors.sharesQuantity = validateSharesQuantity(form.sharesQuantity);
    newErrors.city = validateCity(form.city);
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    if (!hasStartedForm) {
      analytics.trackInvestmentFormStart();
      setHasStartedForm(true);
    }

    setForm(prev => ({ ...prev, [field]: value }));
    
    if (field === 'sharesQuantity' && value) {
      const quantity = parseInt(toEnglishDigits(value));
      if (!isNaN(quantity) && quantity > 0) {
        const sharePrice = getDynamicSharePrice(quantity);
        analytics.trackSharesQuantityChange(quantity, sharePrice);
      }
    }

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const sharesQuantity = parseInt(toEnglishDigits(form.sharesQuantity));
      const dynamicSharePrice = getDynamicSharePrice(sharesQuantity);
      const calculatedTotal = sharesQuantity * dynamicSharePrice;
      
      // Prepare payload according to backend API documentation
      const payload = {
        fullName: form.fullName.trim(),
        phoneNumber: toEnglishDigits(form.phoneNumber.replace(/[\s\-()]/g, '')),
        companyID: 3, // Default company ID - can be made dynamic later
        sharesQuantity,
        calculatedTotal,
        city: form.city.trim()
      };

      // Use Next.js API route as proxy (hides backend URL from client)
      const res = await fetch('/api/investor-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        analytics.trackInvestmentFormComplete({
          investment_amount: calculatedTotal,
          shares_quantity: sharesQuantity,
          share_price: dynamicSharePrice,
          investor_city: form.city.trim(),
          discount_percentage: getDiscountPercentage(sharesQuantity),
          package_type: getPackageType(sharesQuantity)
        });

        analytics.trackPurchase({
          transaction_id: data.data?.id || `INV_${Date.now()}`,
          value: calculatedTotal,
          currency: 'SAR',
          items: [{
            item_id: 'BJEEK_SHARES',
            item_name: locale === 'ar' ? 'أسهم بجيك' : 'Bjeek Shares',
            quantity: sharesQuantity,
            price: dynamicSharePrice
          }]
        });

        analytics.trackLead({
          lead_type: 'investment_completed',
          lead_value: calculatedTotal,
          investor_city: form.city.trim(),
          phone_number: payload.phoneNumber
        });

        setSuccess(true);
        setForm({ fullName: '', phoneNumber: '', sharesQuantity: '', city: '' });
        setErrors({});
      } else {
        const errorMessage = data.details?.[0]?.message || 
                           data.message || 
                           t('error.default');
        setError(errorMessage);
      }
    } catch {
      setError(t('error.network'));
    } finally {
      setLoading(false);
    }
  };

  const getPackageType = (quantity: number): string => {
    if (quantity >= 1000000) return t('packages.golden');
    if (quantity >= 500000) return t('packages.platinum');
    if (quantity >= 350000) return t('packages.diamond');
    if (quantity >= 250000) return t('packages.golden');
    if (quantity >= 120000) return t('packages.silver');
    if (quantity >= 50000) return t('packages.bronze');
    if (quantity >= 15000) return t('packages.advanced');
    return t('packages.basic');
  };

  const sharePrice = 4;
  const sharesQuantityNum = form.sharesQuantity ? parseInt(toEnglishDigits(form.sharesQuantity)) : 0;
  const currentSharePrice = sharesQuantityNum > 0 ? getDynamicSharePrice(sharesQuantityNum) : sharePrice;
  const discountPercentage = sharesQuantityNum > 0 ? getDiscountPercentage(sharesQuantityNum) : 0;
  const originalPrice = 4.00;
  const calculatedTotal = sharesQuantityNum * currentSharePrice;
  const totalSavings = sharesQuantityNum * (originalPrice - currentSharePrice);

  return (
    <div 
      className="h-screen pb-20 pt-32 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/bjeek-background.jpg)'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/70" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {t('title')}
          </h1>
          <p className="text-white mb-4 text-sm md:text-base drop-shadow">
            {t('subtitle')}
          </p>
          
          {/* Compact Share Price Display */}
          <div className="inline-flex items-center gap-3 bg-green-600 backdrop-blur-xl border border-green-600 rounded-xl px-4 py-2 relative shadow-lg shadow-green-400/20">
            <div className="absolute inset-0 bg-green-400/10 rounded-xl"></div>
            <span className="text-white text-sm relative z-10 font-medium">{t('sharePrice')}</span>
            {discountPercentage > 0 && (
              <span className="text-white line-through text-sm relative z-10">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-white relative z-10">
              {formatCurrency(currentSharePrice)}
            </span>
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold relative z-10 animate-pulse">
                {t('discount')} {discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Compact Form Container - Glassy Effect */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl shadow-black/50 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-3xl before:pointer-events-none">
          {/* Inner glassy glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/10 rounded-3xl"></div>
          
          {/* Frosted glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-500 rounded-full mb-4 shadow-lg shadow-green-500/50">
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent mb-3">
                  {t('success.title')}
                </h3>
                <p className="text-gray-200">
                  {t('success.message')}<br />
                  <span className="font-semibold text-green-500">{t('success.contact')}</span>
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Form Fields - 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-green-500 font-medium text-sm">{t('fullName.label')}</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder={t('fullName.placeholder')}
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                          errors.fullName 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-green-500 hover:border-green-500/50'
                        }`}
                        disabled={loading}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-400 text-sm text-right flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-green-500 font-medium text-sm">{t('phoneNumber.label')}</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder={t('phoneNumber.placeholder')}
                        value={form.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                          errors.phoneNumber 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-green-500 hover:border-green-500/50'
                        }`}
                        disabled={loading}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-sm text-right flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  
                  {/* Shares Quantity */}
                  <div className="space-y-2">
                    <label className="block text-green-500 font-medium text-sm">{t('sharesQuantity.label')}</label>
                    <div className="relative">
                      <Package size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        name="sharesQuantity"
                        placeholder={t('sharesQuantity.placeholder')}
                        value={form.sharesQuantity}
                        onChange={(e) => handleChange('sharesQuantity', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                          errors.sharesQuantity 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-green-500 hover:border-green-500/50'
                        }`}
                        disabled={loading}
                      />
                    </div>
                    {errors.sharesQuantity && (
                      <p className="text-red-400 text-sm text-right flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.sharesQuantity}
                      </p>
                    )}
                  </div>
                  
                  {/* City */}
                  <div className="space-y-2">
                    <label className="block text-green-500 font-medium text-sm">{t('city.label')}</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        placeholder={t('city.placeholder')}
                        value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                          errors.city 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-green-500 hover:border-green-500/50'
                        }`}
                        disabled={loading}
                      />
                    </div>
                    {errors.city && (
                      <p className="text-red-400 text-sm text-right flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Compact Investment Calculator */}
                {calculatedTotal > 0 && (
                  <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-lg shadow-green-500/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-green-500">
                        <Calculator size={18} />
                        <span className="font-bold">{t('calculator.title')}</span>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent">
                        {formatCurrency(calculatedTotal)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">{t('calculator.sharesCount')}</div>
                        <div className="text-lg font-bold text-white">{formatNumber(sharesQuantityNum)}</div>
                      </div>
                      
                      {/* Share Price Section with Before/After Discount */}
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">{t('calculator.sharePrice')}</div>
                        <div className="flex items-center justify-center gap-2">
                          {discountPercentage > 0 ? (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                {formatCurrency(originalPrice)}
                              </span>
                              <span className="text-lg font-bold text-green-500">
                                {formatCurrency(currentSharePrice)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-green-500">
                              {formatCurrency(currentSharePrice)}
                            </span>
                          )}
                        </div>
                        {discountPercentage > 0 && (
                          <div className="text-xs text-red-300 mt-1">
                            {t('discount')} {discountPercentage}%
                          </div>
                        )}
                      </div>
                      
                      {totalSavings > 0 && (
                        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-lg p-3 col-span-1 md:col-span-2">
                          <div className="text-red-300 text-xs mb-1">{t('calculator.totalSavings')}</div>
                          <div className="text-lg font-bold text-red-300">{formatCurrency(totalSavings)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/30 rounded-xl">
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-red-300 text-sm text-right flex-1">{error}</span>
                  </div>
                )}
                
                {/* Compact Submit Button */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-500 hover:from-green-500/90 hover:to-green-500/90 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-xl shadow-xl shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('submit.loading')}
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        {t('submit.default')}
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentFormClient;

