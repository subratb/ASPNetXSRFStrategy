# ASPNetXSRFStrategy

Angular2 provides CookieXSRFStrategy to set up Cross Site Request Forgery (XSRF) protection for the application
using a cookie.

ASP.Net also uses a hidden form value along with the cookie to validate the request. Using the ASPNetXSRFStrategy 
given here, one can leverage the build in ASP.Net facilities to enable XSRF protection for the application.

The cshtml page should set up the AntiForgeryToken by calling @Html.AntiForgeryToken(). This sets up the cookie and 
hidden form field.

The action methods, which needs to be protected against XSRF can then specify ValidateHttpAntiForgeryTokenAttribute, 
also included here. This checks for the cookie and the matching header value to enable XSRF protection.