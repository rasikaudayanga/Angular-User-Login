Steps to set up in loccaly and  in IIS Server

1.	Please clone or download the source code here (https://github.com/rasikaudayanga/Angular-User-Login.git) 

2.	To set up locally, run 'npm install' then execute 'ng serve' command and open the browser url http://localhost:4200/

3.	To Build the app, run ‘ng build --base-href "/AutodeskLogin'/" --prod’ command. So, will create a build file as “dist”. I have included same file in git folder (Angular-User-Login/dist/autodesk-user-registration-and-login/). You can you same folder file to deploy iis.

4.	Create a Web application in IIS Create new folder called 'AutodeskLogin' under C:\inetpub\wwwroot\ folder and copy the above angular build files into this folder. Create a new web site or web application or virtual directory in IIS to host the Angular application. In this case you can create a new website SPA and create new web application AutodeskLogin under it. Set the C:\inetpub\wwwroot\AutodeskLogin as the physical path of the web site.

5.	To Install URL rewrite module in IIS (If already not installed) use below URL rewrite module from this link - https://www.iis.net/downloads/microsoft/url-rewrite

6.	With this you can now browse the url http://localhost/AutodeskLogin/ from the browser. This should load initial Login page.
