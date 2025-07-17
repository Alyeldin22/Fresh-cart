import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitle() {
  const location = useLocation(); // جلب المسار الحالي

  useEffect(() => {
    // تحديد العناوين لكل صفحة
    const pageTitles = {
        "/": "Home",
        "/products": "Products",
        "/categories": "Categories",
        "/checkout": "Checkout",
        "/allorders": "Orders",
        "/cart": "Cart",
        "/wishlist": "Wishlist",
        "/brands": "Brands",
        "/register": " Register",
        "/login": "Login",
        "/forgetpassword": "Forget Password",
        "/verifycode": "Verify Code",
        "/updatepassword": "Update Password",
      };

    // تحديث العنوان بناءً على المسار الحالي
    document.title = pageTitles[location.pathname] || "FreshCart";

  }, [location.pathname]); // تحديث العنوان عند تغيير المسار

  return null; // لا يعرض أي شيء في الواجهة
}

export default PageTitle;
