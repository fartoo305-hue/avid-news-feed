import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
          <ArrowRight className="h-4 w-4" /> العودة إلى الرئيسية
        </Link>

        <h1 className="text-3xl font-black mb-6">سياسة الخصوصية</h1>

        <div className="prose max-w-none font-body text-foreground/90 space-y-4 leading-relaxed">
          <p><strong>آخر تحديث:</strong> فبراير ٢٠٢٦</p>

          <h2 className="text-xl font-bold mt-6">١. المعلومات التي نجمعها</h2>
          <p>نجمع المعلومات التي تقدمها لنا مباشرة عند الاشتراك في النشرة الإخبارية أو التواصل معنا. قد نجمع أيضاً معلومات تلقائية مثل عنوان IP ونوع المتصفح وصفحات الموقع التي تزورها.</p>

          <h2 className="text-xl font-bold mt-6">٢. استخدام المعلومات</h2>
          <p>نستخدم المعلومات المجمعة لتحسين خدماتنا، وإرسال التحديثات الإخبارية، وتحليل أداء الموقع، وعرض الإعلانات المخصصة عبر Google AdSense.</p>

          <h2 className="text-xl font-bold mt-6">٣. ملفات تعريف الارتباط (Cookies)</h2>
          <p>نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح. قد تستخدم خدمات الإعلانات الخارجية مثل Google AdSense ملفات تعريف الارتباط لعرض إعلانات مخصصة.</p>

          <h2 className="text-xl font-bold mt-6">٤. مشاركة المعلومات</h2>
          <p>لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا عند الضرورة لتقديم خدماتنا أو عند الطلب القانوني.</p>

          <h2 className="text-xl font-bold mt-6">٥. حقوقك</h2>
          <p>يحق لك طلب الوصول إلى بياناتك الشخصية أو تعديلها أو حذفها في أي وقت عبر التواصل معنا.</p>

          <h2 className="text-xl font-bold mt-6">٦. التواصل</h2>
          <p>لأي استفسارات حول سياسة الخصوصية، يرجى التواصل معنا عبر صفحة <Link to="/contact" className="text-primary hover:underline">اتصل بنا</Link>.</p>
        </div>
      </div>
    </div>
  );
}
