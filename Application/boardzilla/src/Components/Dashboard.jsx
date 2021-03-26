import { useState, useCallback } from 'react';
import { Container } from './Container';

export const Dashboard = () => {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true);
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
        hideSourceOnDrag,
    ]);
    return (
        <div>
			<Container hideSourceOnDrag={true}/>
		</div>);
};

export default Dashboard;