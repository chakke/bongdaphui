import { Vec2 } from '../graphic-2d/vec2';
import { Size } from '../graphic-2d/size';

export class Map {
    id: number;
    name: string;
    elements: Array<MapElement> = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.elements = [];
    }

    onResponseData(map: Map) {
        this.id = map.id;
        this.name = map.name;
        this.elements = map.elements;
    }

    setElements(mapElements: Array<MapElement>){
        this.elements = mapElements;
    }
}

export class MapElement {
    id: string;
    
    size: Size;
    // position by ratio (range: 0 ~ 1)
    vec2: Vec2;

    constructor(id: string) {
        this.id = id;
        this.vec2 = new Vec2(0,0);
        // this.w = 0;
        // this.h = 0;
    }

    setVec2(x: number, y: number) {
        this.vec2.set(x,y);
    }

    setSize(w: number, h: number) {
        this.size.set(w,h);
    }

}