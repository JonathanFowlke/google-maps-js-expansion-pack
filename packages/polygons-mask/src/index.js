import Math from "@mapscoder/google-math";

class PolygonsMask {

    static createPolygonsMask(polygons) {
        const mask = PolygonsMask.invertPolygons(polygons);
        mask.setOptions({
            clickable: false,
            zIndex: -1,
            fillColor: "#231F20",
            fillOpacity: 0.35,
            strokeWeight: 0
        });
        return mask;
    }

    static invertPolygons(polygons) {
        const MapExtent = {
            NORTH: 85.0511288,
            SOUTH: -85.0511287,
            EAST: 180.0,
            WEST: -180.0
        };
        const worldPath = [
            {lat: MapExtent.NORTH, lng: MapExtent.WEST},
            {lat: MapExtent.NORTH, lng: 0},
            {lat: MapExtent.NORTH, lng: MapExtent.EAST},
            {lat: MapExtent.SOUTH, lng: MapExtent.EAST},
            {lat: MapExtent.SOUTH, lng: 0},
            {lat: MapExtent.SOUTH, lng: MapExtent.WEST}
        ];

        const paths = [worldPath];

        //TODO: allow for single polygon as input as well as array of polygons
        polygons.forEach(function (polygon) {
            const polygonPaths = polygon.getPaths();
            if (polygonPaths.length > 1) {
                const clockwise = Math.isClockwise(polygonPaths[0]);
                polygonPaths.forEach(function (path) {
                    const positions = path.getArray();
                    let clone = positions.slice();
                    // only reverse positions if necessary
                    if (clockwise) {
                        clone = clone.reverse();
                    }
                    paths.push(clone);
                });
            }
        });

        return new google.maps.Polygon({paths: paths});
    }

}

export default PolygonsMask;