import { Pressable, PressableProps } from 'react-native';

type PressProps = PressableProps & { className?: string };

/**
 * Pressable with the design's tactile press feedback (gl-press): a subtle
 * scale-down on touch. NativeWind maps the `active:` variant to the pressed state.
 */
export function Press({ className = '', children, ...rest }: PressProps) {
  return (
    <Pressable className={`active:scale-[0.965] active:opacity-95 ${className}`} {...rest}>
      {children}
    </Pressable>
  );
}
