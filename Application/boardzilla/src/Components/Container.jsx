import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from './Box';
import {Widget} from "./Widget";
import update from 'immutability-helper';

const styles = {
    width: 1000,
    height: 300,
    border: '1px solid black',
    position: 'relative',
};

export const Container = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState({
        a: { top: 20, left: 80, title: 'Drag me around', widget: <Widget color={"green"} />},
        b: { top: 180, left: 20, title: 'Drag me too' },
    });

    const moveBox = useCallback((id, left, top) => {
        setBoxes(update(boxes, {
            [id]: {
                $merge: { left, top },
            },
        }));
    }, [boxes, setBoxes]);
    const [, drop] = useDrop(() => ({
        accept: "box",
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveBox(item.id, left, top);
            return undefined;
        },
    }), [moveBox]);
    return (<div ref={drop} style={styles}>
			{Object.keys(boxes).map((key) => {
        const { left, top, title, widget } = boxes[key];
        return (<Box key={key} id={key} left={left} top={top} hideSourceOnDrag={hideSourceOnDrag}>
						{widget}
					</Box>);
    })}
		</div>);
};
