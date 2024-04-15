export default function ColorPicker({ colors, onColorClick}: { colors: string[], onColorClick: (color: string) => void }) {
    return (
        <div className="flex flex-wrap">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-5 h-5 m-1 cursor-pointer`}
              style={{ 
                backgroundColor: color,
              }}
              onClick={() => onColorClick(color)}
            ></div>
          ))}
        </div>
    );
}