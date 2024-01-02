open live server and in setting enable full reload
npx tailwindcss init
create a build and src file
in build create index.html
in tailwind.config.js put   content: ['./build/*.html'],
in src create input.css and paste
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
then run npx tailwindcss -i ./src/input.css -o ./build/css/style.css  --watch
now the code will get complied and added to build css folder 
now ready to code in index.html