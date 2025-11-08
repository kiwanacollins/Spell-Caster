'use client';

interface SketchfabBackgroundProps {
  modelId: string;
  className?: string;
  opacity?: number;
}

export function SketchfabBackground({ 
  modelId, 
  className = '', 
  opacity = 0.3 
}: SketchfabBackgroundProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <iframe 
        title="3D Background Scene" 
        frameBorder={0}
        allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; magnetometer; gyroscope" 
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&transparent=1&ui_hint=0&ui_controls=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark=0`}
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
      />
    </div>
  );
}
