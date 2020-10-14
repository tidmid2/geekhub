$(".firsttext h1").on('click', function(){
  $(".secondtext").toggle();
});
function loadImages(files, callbackAllFilesLoaded)
          {
               // создание переменной которая будет считать кол-вло файлов
               
               var countFilesToLoad = 0;
               for (var fileId in files)
               {
                    countFilesToLoad++; // считаем количество файлов
               }
               // создание листа 
               var images = {};
               for (var fileId in files)
               {
                    // создаем пустую картинку
                    images[fileId] = new Image();

                    // событие onload
                    images[fileId].onload = function()
                    {
                         // когда все файлы загрузились, вызываем нашу функцию callbackAllFilesLoaded чтобы нарисовать картинку
                         if ( --countFilesToLoad <= 0 )
                         {
                              callbackAllFilesLoaded(images);
                         }
                    };
                    // загружаем картинку
                    images[fileId].src = files[fileId];
               }
          }
 function AnimationInit()
          {
               window.requestAnimFrame = (function(callback) {
                    return window.requestAnimationFrame ||
                         window.webkitRequestAnimationFrame ||
                         window.mozRequestAnimationFrame ||
                         window.oRequestAnimationFrame ||
                         window.msRequestAnimationFrame ||
                         function(callback)
                         {
                              window.setTimeout(callback, 1000 / 60);
                         };
               })();
          }
function MyAnimation(context, canvas, loadedImages, data){
               //очищаем все на canvas
               context.clearRect(0, 0, canvas.width, canvas.height);
               // рисуем картинку по позиции x,y
               context.drawImage(loadedImages.tree, data.xPos, data.yPos);
               // меняем позицию картинки
               data.xPos = data.xPos>410 ? 0 : data.xPos + 2.6;
               // request new frame
               requestAnimFrame(function(){
               MyAnimation(context, canvas, loadedImages, data);
               });
          }

          //файл
          var files = {
               tree : "./tree.jpg"
          };
         
          //context для рисования
          var canvas = document.getElementById('canvas1');
          var context = canvas.getContext('2d');

          //загружаем картинки
          loadImages(files, function (loadedImages)
          {
               //инициализация анимации
               AnimationInit();

               //данные для перемещения
               var data = {
                    xPos: 0,
                    yPos: 20
               };

               //запускаем бесконечную анимацию
               MyAnimation(context, canvas, loadedImages, data);
          });