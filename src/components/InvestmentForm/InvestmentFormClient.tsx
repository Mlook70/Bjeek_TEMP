'use client'
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, User, Phone, Package, MapPin, Calculator, Sparkles } from 'lucide-react';
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
    analytics.trackPageView('investment_form', 'نموذج الاستثمار - بجيك');
  }, [analytics]);

  // Validation functions
  const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) return 'الاسم الكامل مطلوب';
    if (name.trim().length < 3) return 'الاسم يجب أن يكون على الأقل 3 أحرف';
    if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(name.trim())) return 'يرجى إدخال اسم صحيح';
    return undefined;
  };

  const validatePhoneNumber = (phone: string): string | undefined => {
    if (!phone.trim()) return 'رقم الجوال مطلوب';
    const cleanPhone = toEnglishDigits(phone.replace(/[\s\-()]/g, ''));
    if (!/^(\+966|966|05|5)?[0-9]{8,9}$/.test(cleanPhone)) {
      return 'يرجى إدخال رقم جوال سعودي صحيح';
    }
    return undefined;
  };

  const validateSharesQuantity = (shares: string): string | undefined => {
    if (!shares || shares.toString().trim() === '') return 'عدد الأسهم مطلوب';
    const sharesNum = parseInt(toEnglishDigits(shares.toString()));
    if (isNaN(sharesNum) || sharesNum <= 0) return 'يرجى إدخال عدد أسهم صحيح';
    if (sharesNum < 5000) return 'الحد الأدنى للاستثمار هو 5000 سهم';
    return undefined;
  };

  const validateCity = (city: string): string | undefined => {
    if (!city.trim()) return 'المدينة مطلوبة';
    if (city.trim().length < 2) return 'اسم المدينة يجب أن يكون على الأقل حرفين';
    if (!/^[\u0600-\u06FFa-zA-Z\s\-]+$/.test(city.trim())) return 'يرجى إدخال اسم مدينة صحيح';
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
            item_name: 'أسهم بجيك',
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
                           'حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى';
        setError(errorMessage);
      }
    } catch {
      setError('تعذر الاتصال بالخادم، يرجى التأكد من الاتصال بالإنترنت والمحاولة مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  const getPackageType = (quantity: number): string => {
    if (quantity >= 1000000) return 'الذهبية';
    if (quantity >= 500000) return 'البلاتينية';
    if (quantity >= 350000) return 'الماسية';
    if (quantity >= 250000) return 'الذهبية';
    if (quantity >= 120000) return 'الفضية';
    if (quantity >= 50000) return 'البرونزية';
    if (quantity >= 15000) return 'المتقدمة';
    return 'الأساسية';
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
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/bjeek-background.jpg)'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 bg-black/70" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-[#41fc95] to-white bg-clip-text text-transparent mb-2 drop-shadow-lg">
            استثمر معنا الآن
          </h1>
          <p className="text-gray-200 mb-4 text-sm md:text-base drop-shadow">
            انضم إلى آلاف المستثمرين الناجحين واستثمر في مستقبلك المالي
          </p>
          
          {/* Compact Share Price Display */}
          <div className="inline-flex items-center gap-3 bg-[#00b14f]/20 backdrop-blur-xl border border-[#00b14f]/40 rounded-xl px-4 py-2 relative shadow-lg shadow-[#00b14f]/20">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00b14f]/10 to-green-500/10 rounded-xl"></div>
            <span className="text-[#41fc95] text-sm relative z-10 font-medium">سعر السهم</span>
            {discountPercentage > 0 && (
              <span className="text-gray-400 line-through text-sm relative z-10">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold bg-gradient-to-r from-[#00b14f] to-[#41fc95] bg-clip-text text-transparent relative z-10">
              {formatCurrency(currentSharePrice)}
            </span>
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold relative z-10 animate-pulse">
                خصم {discountPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Compact Form Container - Glassy Effect */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl shadow-black/50 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-3xl before:pointer-events-none">
          {/* Inner glassy glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00b14f]/10 via-transparent to-emerald-500/10 rounded-3xl"></div>
          
          {/* Frosted glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#00b14f] to-emerald-500 rounded-full mb-4 shadow-lg shadow-[#00b14f]/50">
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00b14f] to-[#41fc95] bg-clip-text text-transparent mb-3">
                  تم الإرسال بنجاح!
                </h3>
                <p className="text-gray-200">
                  شكراً لك على اهتمامك بالاستثمار معنا<br />
                  <span className="font-semibold text-[#41fc95]">سيتم التواصل معك خلال 24 ساعة</span>
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Form Fields - 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-[#41fc95] font-medium text-right text-sm">الاسم الكامل</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="أدخل اسمك الكامل"
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 ${
                          errors.fullName 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-[#00b14f] hover:border-[#00b14f]/50'
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
                    <label className="block text-[#41fc95] font-medium text-right text-sm">رقم الجوال</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="05xxxxxxxx"
                        value={form.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 ${
                          errors.phoneNumber 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-[#00b14f] hover:border-[#00b14f]/50'
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
                    <label className="block text-[#41fc95] font-medium text-right text-sm">عدد الأسهم</label>
                    <div className="relative">
                      <Package size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        inputMode="numeric"
                        name="sharesQuantity"
                        placeholder="الحد الأدنى: 5000"
                        value={form.sharesQuantity}
                        onChange={(e) => handleChange('sharesQuantity', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 ${
                          errors.sharesQuantity 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-[#00b14f] hover:border-[#00b14f]/50'
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
                    <label className="block text-[#41fc95] font-medium text-right text-sm">المدينة</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        placeholder="أدخل مدينتك"
                        value={form.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl transition-all duration-300 text-white placeholder:text-gray-400 text-right focus:outline-none focus:ring-2 focus:ring-[#00b14f]/50 ${
                          errors.city 
                            ? 'border-red-500 focus:border-red-400' 
                            : 'border-white/20 focus:border-[#00b14f] hover:border-[#00b14f]/50'
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
                  <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-lg shadow-[#00b14f]/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[#41fc95]">
                        <Calculator size={18} />
                        <span className="font-bold">حاسبة الاستثمار</span>
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#00b14f] to-[#41fc95] bg-clip-text text-transparent">
                        {formatCurrency(calculatedTotal)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">عدد الأسهم</div>
                        <div className="text-lg font-bold text-white">{formatNumber(sharesQuantityNum)}</div>
                      </div>
                      
                      {/* Share Price Section with Before/After Discount */}
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3">
                        <div className="text-gray-400 text-xs mb-1">سعر السهم</div>
                        <div className="flex items-center justify-center gap-2">
                          {discountPercentage > 0 ? (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                {formatCurrency(originalPrice)}
                              </span>
                              <span className="text-lg font-bold text-[#41fc95]">
                                {formatCurrency(currentSharePrice)}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-[#41fc95]">
                              {formatCurrency(currentSharePrice)}
                            </span>
                          )}
                        </div>
                        {discountPercentage > 0 && (
                          <div className="text-xs text-red-300 mt-1">
                            خصم {discountPercentage}%
                          </div>
                        )}
                      </div>
                      
                      {totalSavings > 0 && (
                        <div className="bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-lg p-3 col-span-1 md:col-span-2">
                          <div className="text-red-300 text-xs mb-1">إجمالي التوفير</div>
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
                  className="w-full py-4 bg-gradient-to-r from-[#00b14f] to-emerald-600 hover:from-[#00b14f]/90 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-xl shadow-xl shadow-[#00b14f]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        إرسال طلب الاستثمار
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

