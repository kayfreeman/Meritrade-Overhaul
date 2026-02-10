
import React, { useState } from 'react';
import { OnboardingStatus } from '../types';
import { COLORS, MERISTEM_LOGO_SVG } from '../constants';

interface OnboardingProps {
  onComplete: (status: OnboardingStatus) => void;
}

const steps = [
  { id: 1, title: 'Identity', subtitle: 'Basic Profile Information' },
  { id: 2, title: 'KYC Details', subtitle: 'BVN/NIN Verification' },
  { id: 3, title: 'Banking', subtitle: 'Link Bank Account' },
  { id: 4, title: 'Documents', subtitle: 'Identity Documents & Selfie' },
  { id: 5, title: 'Consent', subtitle: 'Risk Disclosure & Privacy' }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    address: '',
    bvn: '',
    accountNumber: '',
    bankName: '',
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Simulate submission
      onComplete(OnboardingStatus.KYC_IN_REVIEW);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          {MERISTEM_LOGO_SVG}
        </div>

        {/* Progress Stepper */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300 ${
                    currentStep >= step.id ? 'bg-[#1E4D3B] text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-semibold ${currentStep === step.id ? 'text-[#1E4D3B]' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 transition-all duration-500">
           <div className="mb-8">
             <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep-1].title}</h2>
             <p className="text-gray-500 mt-1">{steps[currentStep-1].subtitle}</p>
           </div>

           <div className="space-y-6">
             {currentStep === 1 && (
               <>
                 <div className="grid grid-cols-1 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
                     <input 
                       type="text" 
                       className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#1E4D3B] focus:border-[#1E4D3B] outline-none transition-all"
                       placeholder="Enter as it appears on your ID"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                       <input type="date" className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 outline-none" />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Nationality</label>
                       <select className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 outline-none">
                         <option>Nigeria</option>
                         <option>Other</option>
                       </select>
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700">Residential Address</label>
                     <textarea rows={2} className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"></textarea>
                   </div>
                 </div>
               </>
             )}

             {currentStep === 2 && (
               <div className="space-y-6">
                 <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    We require your BVN or NIN to comply with NDPA regulations and verify your identity securely with NIBSS.
                 </p>
                 <div>
                   <label className="block text-sm font-medium text-gray-700">Verification Type</label>
                   <div className="mt-2 grid grid-cols-2 gap-4">
                      <button className="py-4 border-2 border-[#1E4D3B] bg-emerald-50 rounded-xl text-center font-bold text-[#1E4D3B]">BVN</button>
                      <button className="py-4 border-2 border-gray-100 rounded-xl text-center font-bold text-gray-400 hover:border-gray-300">NIN</button>
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700">BVN Number</label>
                   <input 
                      type="password" 
                      className="mt-1 block w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                      placeholder="Enter 11-digit BVN"
                   />
                   <p className="mt-2 text-xs text-gray-400 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                      Your BVN will be tokenized and never stored in plaintext.
                   </p>
                 </div>
               </div>
             )}

             {currentStep === 4 && (
                <div className="space-y-6">
                   <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-[#1E4D3B] transition-colors cursor-pointer group">
                      <div className="p-4 bg-gray-50 rounded-full group-hover:bg-emerald-50 transition-colors">
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-[#1E4D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      </div>
                      <p className="mt-4 font-semibold text-gray-700">Capture Live Selfie</p>
                      <p className="text-xs text-gray-400 mt-1">Required for liveness verification</p>
                   </div>
                   <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-[#1E4D3B] transition-colors cursor-pointer group">
                      <div className="p-4 bg-gray-50 rounded-full group-hover:bg-emerald-50 transition-colors">
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-[#1E4D3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                      </div>
                      <p className="mt-4 font-semibold text-gray-700">Upload Identity Document</p>
                      <p className="text-xs text-gray-400 mt-1">Passport, Driver's License, or National ID</p>
                   </div>
                </div>
             )}

             {currentStep === 5 && (
               <div className="space-y-6">
                 <div className="max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed">
                   <h4 className="font-bold text-gray-900 mb-2 uppercase">Risk Disclosure Agreement</h4>
                   <p className="mb-2">Trading in securities involves significant risks. The value of investments and the income from them can fall as well as rise. You may not get back the amount you originally invested...</p>
                   <p className="mb-2">Meristem Nigeria Limited is regulated by the Securities and Exchange Commission (SEC) and is a member of the Nigerian Exchange Group (NGX)...</p>
                   <h4 className="font-bold text-gray-900 mt-4 mb-2 uppercase">Data Processing Policy</h4>
                   <p>In accordance with the Nigeria Data Protection Act (NDPA), your personal identifiers (PII) are stored in an encrypted isolated vault. Meristem only utilizes tokenized references for trading operations...</p>
                 </div>
                 <div className="flex items-start">
                   <div className="flex items-center h-5">
                     <input type="checkbox" className="h-4 w-4 text-[#1E4D3B] focus:ring-[#1E4D3B] border-gray-300 rounded" />
                   </div>
                   <div className="ml-3 text-sm">
                     <label className="font-medium text-gray-700 uppercase text-xs">I accept the Risk Disclosure & Terms of Use</label>
                   </div>
                 </div>
                 <div className="flex items-start">
                   <div className="flex items-center h-5">
                     <input type="checkbox" className="h-4 w-4 text-[#1E4D3B] focus:ring-[#1E4D3B] border-gray-300 rounded" />
                   </div>
                   <div className="ml-3 text-sm">
                     <label className="font-medium text-gray-700 uppercase text-xs">Consent to NDPA-compliant data processing</label>
                   </div>
                 </div>
               </div>
             )}

             <div className="flex items-center justify-between pt-8 border-t border-gray-100">
               <button 
                 onClick={prevStep}
                 disabled={currentStep === 1}
                 className={`px-6 py-3 font-semibold rounded-xl transition-all ${currentStep === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
               >
                 Back
               </button>
               <button 
                 onClick={nextStep}
                 className="px-10 py-3 bg-[#1E4D3B] text-white font-bold rounded-xl shadow-lg hover:bg-opacity-90 active:scale-95 transition-all"
               >
                 {currentStep === steps.length ? 'Submit KYC' : 'Continue'}
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
