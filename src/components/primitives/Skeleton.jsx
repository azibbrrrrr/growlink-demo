import { T } from "../../constants/tokens";
import Card from "./Card";

/**
 * Skeleton — single pulsing placeholder block.
 */
export const Skeleton = ({ w = "100%", h = 14, r = 6, style = {} }) => (
  <div
    style={{
      width: w, height: h, borderRadius: r,
      background: T.gray100,
      animation: "pulse 1.4s ease-in-out infinite",
      ...style,
    }}
  />
);

/**
 * SkeletonCard — full card-shaped loading placeholder.
 */
export const SkeletonCard = () => (
  <Card style={{ padding: "13px 14px", marginBottom: 8 }}>
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div
        style={{
          width: 42, height: 42, borderRadius: 21,
          background: T.gray100,
          animation: "pulse 1.4s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <Skeleton h={12} w="65%" style={{ marginBottom: 6 }} />
        <Skeleton h={10} w="45%" />
      </div>
      <div style={{ textAlign: "right" }}>
        <Skeleton h={14} w={50} style={{ marginBottom: 5 }} />
        <Skeleton h={9}  w={36} />
      </div>
    </div>
  </Card>
);
