export class Vec2 {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    scale(scale) {
        this.x *= scale;
        this.y *= scale;
    }

    add(x: number, y: number) {
        this.x += x;
        this.y += y;
    }
    sub(x: number, y: number) {
        this.x -= x;
        this.y -= y;
    }
    length2() {
        return this.x * this.x + this.y * this.y;
    }

}