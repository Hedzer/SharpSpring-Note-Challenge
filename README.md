### Sharpnotes
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sharpnote is a challenge application written specifically for SharpSpring/SMTP.  It is a note management application that allows a user to view, create, edit, and delete personal notes.

### Installation & Environment
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; My test environment was a default XAMPP setup. Only Maria/MySQL DB, Apache, and PHP are necessary.  Laravel/Lumen 5.2 was also installed.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; After downloading the project, make sure all the dependencies are present.  This can be done by running the `composer update` command in your terminal. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Once all the dependencies are present, make sure the `.env` file has the correct settings for connecting to your DB instance.  The file should contain some settings that look like this: 
```
APP_ENV=production //alternatively can be "development"
APP_DEBUG=true
APP_KEY=d339c94998da9d8104134327f0d9b228

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=c1
DB_USERNAME=root
DB_PASSWORD=
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; With the databse and environment file set up, navigate to the project folder with your terminal and run:
`php artisan migrate`
There should be no errors. After that completes, run:
`php artisan db:seed`
The application's tables should be created and seeded with some existing data.
Now, to run the server, run `php -S localhost:8000 -t "./public"` in your terminal. This may require some change depending on your host operating system.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We Should now be ready to party. Open of your browser and navigate to http://localhost:8000
