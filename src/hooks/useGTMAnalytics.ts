'use client';

import { useCallback } from 'react';

// تعريف أنواع البيانات للـ dataLayer
interface DataLayerEvent {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  custom_parameters?: Record<string, any>;
}

// تعريف أحداث الاستثمار
interface InvestmentEventData {
  investment_amount: number;
  shares_quantity: number;
  share_price: number;
  investor_city: string;
  discount_percentage?: number;
  package_type?: string;
}

export const useGTMAnalytics = () => {
  
  // دالة أساسية لإرسال الأحداث إلى dataLayer
  const pushToDataLayer = useCallback((eventData: DataLayerEvent) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData as any);
      console.log('📊 Event pushed to dataLayer:', eventData);
    }
  }, []);

  // تتبع الأحداث العامة
  const trackEvent = useCallback((
    event: string,
    category: string,
    action?: string,
    label?: string,
    value?: number,
    customParams?: Record<string, any>
  ) => {
    const eventData: DataLayerEvent = {
      event,
      event_category: category,
      event_action: action,
      event_label: label,
      value,
      ...customParams
    };
    
    pushToDataLayer(eventData);
  }, [pushToDataLayer]);

  // 🎯 أحداث الاستثمار المخصصة
  
  // بدء ملء نموذج الاستثمار
  const trackInvestmentFormStart = useCallback(() => {
    trackEvent('start_investment_form', 'investment', 'form_interaction', 'investment_form_started');
  }, [trackEvent]);

  // تعديل كمية الأسهم
  const trackSharesQuantityChange = useCallback((quantity: number, sharePrice: number) => {
    trackEvent('shares_quantity_change', 'investment', 'form_interaction', 'shares_input', quantity, {
      shares_quantity: quantity,
      share_price: sharePrice,
      total_value: quantity * sharePrice
    });
  }, [trackEvent]);

  // إتمام نموذج الاستثمار
  const trackInvestmentFormComplete = useCallback((data: InvestmentEventData) => {
    const eventData: DataLayerEvent = {
      event: 'complete_investment',
      event_category: 'investment',
      event_action: 'form_submission',
      event_label: 'investment_completed',
      value: data.investment_amount,
      currency: 'SAR',
      custom_parameters: {
        shares_quantity: data.shares_quantity,
        share_price: data.share_price,
        investor_city: data.investor_city,
        discount_percentage: data.discount_percentage,
        package_type: data.package_type,
        investment_amount: data.investment_amount
      }
    };
    
    pushToDataLayer(eventData);
  }, [pushToDataLayer]);

  // 🎯 أحداث التفاعل العامة
  
  // تتبع النقر على الأزرار
  const trackButtonClick = useCallback((buttonName: string, location?: string, additionalData?: Record<string, any>) => {
    trackEvent('button_click', 'engagement', 'click', `${buttonName}_${location || 'unknown'}`, undefined, additionalData);
  }, [trackEvent]);

  // تتبع عرض الصفحات
  const trackPageView = useCallback((pageName: string, pageTitle?: string) => {
    const eventData: DataLayerEvent = {
      event: 'page_view',
      event_category: 'navigation',
      event_action: 'page_view',
      event_label: pageName,
      custom_parameters: {
        page_title: pageTitle,
        page_location: typeof window !== 'undefined' ? window.location.href : '',
        page_path: typeof window !== 'undefined' ? window.location.pathname : ''
      }
    };
    
    pushToDataLayer(eventData);
  }, [pushToDataLayer]);

  // تتبع إرسال النماذج
  const trackFormSubmission = useCallback((formName: string, formData?: Record<string, any>) => {
    trackEvent('form_submit', 'lead_generation', 'form_submission', formName, undefined, formData);
  }, [trackEvent]);

  // 🎯 أحداث مخصصة للبكسلات الإعلانية
  
  // حدث Lead (عميل محتمل)
  const trackLead = useCallback((leadData?: Record<string, any>) => {
    const eventData: DataLayerEvent = {
      event: 'generate_lead',
      event_category: 'conversion',
      event_action: 'lead_generation',
      event_label: 'potential_investor',
      custom_parameters: leadData
    };
    
    pushToDataLayer(eventData);
  }, [pushToDataLayer]);

  // حدث Purchase (شراء/استثمار)
  const trackPurchase = useCallback((purchaseData: {
    transaction_id?: string;
    value: number;
    currency?: string;
    items?: any[];
  }) => {
    const eventData: DataLayerEvent = {
      event: 'purchase',
      event_category: 'ecommerce',
      event_action: 'purchase',
      event_label: 'investment_purchase',
      value: purchaseData.value,
      currency: purchaseData.currency || 'SAR',
      custom_parameters: {
        transaction_id: purchaseData.transaction_id,
        items: purchaseData.items
      }
    };
    
    pushToDataLayer(eventData);
  }, [pushToDataLayer]);

  // تتبع الاهتمام بالاستثمار
  const trackInvestmentInterest = useCallback((interestType: string, additionalData?: Record<string, any>) => {
    trackEvent('investment_interest', 'conversion', 'interest_shown', interestType, undefined, additionalData);
  }, [trackEvent]);

  return {
    // دوال أساسية
    trackEvent,
    pushToDataLayer,
    
    // أحداث الاستثمار
    trackInvestmentFormStart,
    trackSharesQuantityChange,
    trackInvestmentFormComplete,
    
    // أحداث التفاعل
    trackButtonClick,
    trackPageView,
    trackFormSubmission,
    
    // أحداث البكسلات
    trackLead,
    trackPurchase,
    trackInvestmentInterest,
  };
};
