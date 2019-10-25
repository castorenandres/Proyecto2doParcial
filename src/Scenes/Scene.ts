import Engine from "../Engine";
abstract class Scene {
    abstract enter = () => {};
    public abstract update = () => {};
    public abstract render = () => {};

    public handleMouseDown = (event: MouseEvent) => {};
};
export default Scene;