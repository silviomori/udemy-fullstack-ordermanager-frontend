# Order Manager

This is a **Full Stack** project based on Nelio Alves' Udemy course:  
https://www.udemy.com/spring-boot-ionic/  

Designed to study some new technologies and put all them together, this is a development project having as the intended outcome a short but complete case study instead of a final product.

Being a case study of an online market place, customers can register themselves, navigate on product categories, add products to the shopping cart, and go through the checkout process.

As a cross-platform application, this project front-end can run on desktop web browsers as well as on mobile devices running Android or iOS.

This project put together some technologies, such as:

* **Back-end**: [https://github.com/silviomori/udemy-ionic-ordermanager-backend](https://github.com/silviomori/udemy-ionic-ordermanager-backend)
	* Java 8
	* Spring Boot 2.0.2
	* RESTful Web Services
	* JWT - JSON Web Tokens
	* Apache Tomcat Server
	* Maven

* **Front-end**: [https://github.com/silviomori/udemy-ionic-ordermanager-frontend](https://github.com/silviomori/udemy-ionic-ordermanager-frontend)
	* Ionic Framework
		* Ionic is a cross-platform mobile app development framework targeted at building hybrid mobile apps. Hybrid apps are essentially small websites running in a browser shell in an app, having access to the native platform layer.
		* Think of Ionic as the front-end UI framework handling all of the look and feel and UI interactions your app needs in order to be compelling.
	* Angular Platform
		* Angular is a platform for building mobile and desktop web applications.
		* Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges.
	* Apache Cordova (Mobile application framework)
		* Apache Cordova enables software programmers to build applications for mobile devices using CSS3, HTML5, and JavaScript instead of relying on platform-specific APIs. Cordova enables wrapping the code up depending upon the device platform.
		* Apache Cordova can be extended with native plug-ins, allowing developers to add more functionalities that can be called from JavaScript, making it communicate directly between the native layer and the HTML5 page. Those plugins allow access to the device's accelerometer, camera, compass, file system, GPS, microphone, and more.
	* HTML 5 (Content and Structure)
	* CSS / SASS (Presentation)
	* JavaScript / TypeScript (Behavior)
	* Node.js
		* Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.
	* NPM
		* NPM is a package manager for the JavaScript programming language.


## Configure Your Environment
### Install these following tools:
* Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)
	* Download and install Node.js in your environment
	* Check if Node.js and NPM have been successfully installed, running these commands in your terminal:
		* `node -v`
		* `npm -v`
* Ionic Framework: [https://ionicframework.com/](https://ionicframework.com/)
	* Install Ionic by running the following command in your terminal:
		* `npm install -g ionic`
	* Check if it has been successfully installed:
		* `ionic -v`
* Apache Cordova: [https://cordova.apache.org/](https://cordova.apache.org/)
	* Install Cordova by running the following command in your terminal:
		* `npm install -g cordova`
	* Check if it has been successfully installed:
		* `cordova -v`
* Visual Studio Code: [https://code.visualstudio.com/](https://code.visualstudio.com/)
	* Download and install VS Code in your environment.
	* Instead of the VS Code, you can use your favorite code editor, such as Atom or Sublime Text.

## Launch the Application
First of all, you need the back-end application to be running. Go to that project to have information on how to start the back-end application: [https://github.com/silviomori/udemy-ionic-ordermanager-backend](https://github.com/silviomori/udemy-ionic-ordermanager-backend)

Having the back-end application running, navigate on the front-end project files to `src/config/api.config.ts` and change the property `baseUrl` to point to your system. For example:

* http://localhost:8080

In the terminal, run this command:

* `ionic cordova run browser`
* If it is the first time you run that command, you may be prompted to install `ionic/app-scripts`. Answer it with `Y`:
	* `Install @ionic/app-scripts? (Y/n)`
* After that, you will have a new browser tab running the user interface.
