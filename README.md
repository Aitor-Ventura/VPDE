_Crear una página web que utilice algún elemento canvas y explicar cómo se ha realizado._

---

Se ha seguido el [tutorial](https://dev.to/zippcodder/complete-guide-to-building-games-in-the-browser-kp6) otorgado por los profesores de la asignatura. En este tutorial se siguen una serie de pasos en los que se muestra cómo llegar al resultado de poder mover un elemento del canvas según el input que le de el jugador sobre un joystick o sobre la pulsación de diferentes teclas. Además del tutorial, se ha añadido la posibilidad de poder permitir a un elemento cubrir toda la pantalla (_Fullscreen_). 

Las API utilizadas son las siguientes:
- Canvas API: porque nos permite utilizar elementos HTML para crear gráficos de forma rápida, por lo que se utiliza el elemento <canvas> para definir un personaje y un joystick.
- Fullscreen API: para permitir que un elemento cubra toda la pantalla. Se ha utilizado con el elemento _document_, dando la sensación de pantalla completa a la que estamos acostumbrados presionando la tecla "F" del teclado. 
- Keyboard Event: utilizando los eventos _keydown_ y _keyup_ se controla el movimiento del personaje si se presionan las teclas AWSD o las flechas direccionales. También se controla el evento de poner la pantalla de forma completa si se presiona la tecla "F". 
- Mouse Event: utilizando el evento _click_ se controla el movimiento del personaje si se le da click al joystick. 
- GitHub Pages: para desplegar el [sitio web](https://aitor-ventura.github.io/VPDE_WebContact/). 

Además de lo anterior, se ha utilizado el validador [Unicorn](https://validator.w3.org/unicorn/) para verificar que el código desarrollado es de calidad.

---

### https://aitor-ventura.github.io/VPDE_WebContact/

---

_Create a web page that makes use of the canvas element and explain how you have done it._

---

A [tutorial](https://dev.to/zippcodder/complete-guide-to-building-games-in-the-browser-kp6) provided by the teachers of the course has been followed. In this tutorial, a series of steps are followed in which it is shown how to reach the result of being able to move an element of the canvas according to the input given by the player, either by using a virtual joystick, or by pressing keys. In addition to the tutorial, the possibility of allowing an element to cover the entire screen (_Fulscreen)_ has been added.

The APIs used are the following:
- Canvas API: because it allows to use the canvas HTML element to create graphics quickly, so the <canvas> element is used to define a character and a joystick.
- Fullscreen API: to allow an element to cover the entire screen. It has been used with teh document element, giving the fullscreen effect we are used to by pressing the key "F" on the keyboard.
- Keyboard Event: using the _keydown_ and _keyup_ events the movement of the character is affected. The fullscreen event also uses this API because it is needed to press the key "F" for it to work.
- Mouse Event: using the _click_ event to control the movevement of the character if the joystick is clicked.
- Github Pages: to deploy the [website](https://aitor-ventura.github.io/VPDE_WebContact/).

In addition to the above, the [Unicorn](https://validator.w3.org/unicorn/) validator has also been used to verify that the developed code is of quality.
