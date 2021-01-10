import React from 'react';
import OffensiveCalculator from '../../Type-Calculator/Calc/OffensiveCalculator';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
    Title
} from './CoverageStyles';

type Props = {
    type1: string,
    type2: string,
}

const OffensiveCoverage: React.FC<Props> = ({
    type1,
    type2
}) =>{

    return (
        <div className="offensive">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Title>Offensive Coverage:</Title>
                </Col>
            </Row>
            <OffensiveCalculator type1={type1}/>
            {type2 !== 'None' && <OffensiveCalculator type1={type2}/>}
        </div>
    );
}

export default OffensiveCoverage;