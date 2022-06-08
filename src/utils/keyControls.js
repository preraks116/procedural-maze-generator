import { camera } from "../scenes/perspective";

const keyDict = {
    "w": {
        "pressed": false,
        "x": 0,
        "z": 1,
    },
    "a": {
        "pressed": false,
        "x": 1,
        "z": 0,
    },
    "s": {
        "pressed": false,
        "x": 0,
        "z": -1,
    },
    "d": {
        "pressed": false,
        "x": -1,
        "z": 0,
    }
}

function setKey(e, val, camera, player) {
    if (keyDict[e.key]) {
        keyDict[e.key].pressed = val;
    }
    if (val) {
        camera.update(player);
    }
}

export { keyDict, setKey };