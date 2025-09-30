import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function MyAdvancedMarker({ position }) {
  return (
    <AdvancedMarker position={position}>
      <Pin
        background={"#0f9d58"}
        borderColor={"#006425"}
        glyphColor={"#60d98f"}
      />
    </AdvancedMarker>
  );
}
