<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel React App</title>

         <link href="{{ asset('/public/css/app.css') }}" rel="stylesheet">
          <link href="{{ asset('/public/css/custom.css') }}" rel="stylesheet">
        <script src="{{ asset('/public/js/app.js') }}" defer></script>
       
    </head>
    <body >
         <div id='crud'></div>
    </body>
</html>
