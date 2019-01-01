# dummy-project

## Getting started
To start the app:
- Run the batch script [setup](/setup.bat).
- Open browser and navigate to http://localhost:3001

Hint: To change the port, go to [.env](.env) file and change the variable `PORT`
## Framework
I have built my own framework, the framework is following MVC pattern.

All the methods are documented in JSDocs (as comments above the method signature)

### Routing
I have built a Router class in [Router.js](/routes/Router.js), this will be responsible for constructing the routes and saving them to the class property `handlers`.

In [Routes.js](/routes/Routes.js) you can modify your routes using the functions implemented in the Router class.

You can create routes for any of the HTTP methods and you specify the controller function you want the request to be routed to, for example:

`appRouter.route('/home', HomeController.init);`

This will route the request to the function `init` in the controller `HomeController`

### Rendering
I have built my own [render function](/views/render.js) that will render the HTML file and evaluate the javascript between the characters `<%` and `%>` or replacing it with data variables sent to the renderer


### Controllers
The [Base Controller](/controllers/Controller.js) has the functions that serve your CSS and JS files requested by the site visitor, and it also has the function that extracts the post data from the request.

All controllers should inherit from this base controller.

### Models
We have only one model [Biker.js](/models/Biker.js), this is a mongoose schema model that has all the CRUD functionalities of Bikers table in the database dummyApp.

### Views
The [views](/views) are all HTML with a self-built renderer to allow javascript instructions to be written in the middle of the HTML.

### Assets
The javascript are in [assets](/assets) folder and it is minimized and uglified to the folder [public](/public) to be served to the site visitors.

I am using GulpJS as the task runner, the [Gulp file](/gulpfile.js) is in the root folder. 