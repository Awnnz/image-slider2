import { createImageSlider } from "./modules/image-slider";
import img1 from './images/slide-img1.jpg';
import img2 from './images/slide-img2.jpg';
import img3 from './images/slide-img3.jpg';
import img4 from './images/slide-img4.jpg';
import img5 from './images/slide-img5.jpg';



const imageCollection = [img1, img2, img3, img4, img5];


document.body.appendChild(createImageSlider(imageCollection));
