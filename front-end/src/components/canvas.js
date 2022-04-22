import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const array = [
        {
            id: 0,
            bgColor: '#ff0',
            coords: {
                x: 0,
                y: 0
            }
        },
        {
            id: 2,
            bgColor: '#0ff',
            coords: {
                x: 50,
                y: 0
            }
        },
        {
            id: 3,
            bgColor: '#f0f',
            coords: {
                x: 100,
                y: 0
            }
        },
        {
            id: 4,
            bgColor: '#444',
            coords: {
                x: 150,
                y: 0
            }
        },
        {
            id: 5,
            bgColor: '#5f4',
            coords: {
                x: 0,
                y: 50
            }
        },
        {
            id: 6,
            bgColor: '#017',
            coords: {
                x: 50,
                y: 50
            }
        },
        {
            id: 7,
            bgColor: '#927',
            coords: {
                x: 100,
                y: 50
            }
        },
        {
            id: 8,
            bgColor: '#666',
            coords: {
                x: 150,
                y: 50
            }
        }
    ];

    canvas.removeEventListener('click', () => {})
    canvas.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('work out element clicked');
    });

    array.forEach((item) => {
        const {bgColor, coords} = item;
        context.fillStyle = bgColor;
        context.fillRect(coords.x, coords.y, 50, 50)
    });

  }, []);
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas;