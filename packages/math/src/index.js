"use strict";

class Math {

    static crossesAntimeridian(position1, position2) {
        return (Math.abs(position1.lng() - position2.lng()) > 180) && ((position1.lng() < 0 && position2.lng() > 0) || (position1.lng() > 0 && position2.lng() < 0));
    }

    static anyCrossesAntimeridian(positions) {
        let previous = positions[positions.length - 1];
        for (let i = 0; i < positions.length; i++) {
            let position = positions[i];
            if (Math.crossesAntimeridian(position, previous)) {
                return true;
            }
            previous = position;
        }
        return false;
    }

    static positiveLongitudes(positions) {
        return positions.map((position) => {
            let lng = position.lng();
            if (lng < 0) {
                lng += 360;
            }
            return new google.maps.LatLng(position.lat(), lng, true);
        });
    }

    static isClockwise(positions) {
        if (Math.anyCrossesAntimeridian(positions)) {
            positions = Math.positiveLongitudes(positions);
        }

        const area = google.maps.geometry.spherical.computeSignedArea(positions);
        return area <= 0;
    }

}

export default Math;