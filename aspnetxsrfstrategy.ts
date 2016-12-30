//based on CookieXSRFStrategy available at
//https://raw.githubusercontent.com/angular/angular/master/modules/%40angular/http/src/backends/xhr_backend.ts

import {__platform_browser_private__} from '@angular/platform-browser';
import { XSRFStrategy, Request } from '@angular/http';

/** 
 * ASP.Net MVC applications can use `ASPNetXSRFStrategy` for `XSRFStrategy` while setting up the application.
 * To know more about this feature go to https://angular.io/docs/ts/latest/guide/security.html#!#http.
 * The ASP.Net MVC page which expects cookie and header must set the AntiForgeryToken by calling `@Html.AntiForgeryToken()`.
 * This call to '@Html.AntiForgeryToken()` sets up the cookie and hidden form field. Cookie is automatically sent
 * by the request, whereas we retrieve the hidden for field value here and append the same as a header to the request.
*/
export class ASPNetXSRFStrategy implements XSRFStrategy {
    constructor(
        private _cookieName: string = '__RequestVerificationToken', private _headerName: string = '__RequestVerificationToken') { }

    configureRequest(req: Request): void {

        const dom = __platform_browser_private__.getDOM();
        const doc = dom.defaultDoc();
        const requestVerificationToken = dom.querySelector(doc, 'input[name="__RequestVerificationToken"]');
        
        //asp.net accompanying cookie is automatically sent in the request
        //we just need to add a header with the hidden form field value
        if (requestVerificationToken) {
            const xsrfHeaderToken = dom.getValue(requestVerificationToken);
            if (xsrfHeaderToken) {
                req.headers.set(this._headerName, xsrfHeaderToken);
            }
        }
    }
}