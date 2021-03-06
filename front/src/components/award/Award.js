import { Card, Row, Button, Col } from 'react-bootstrap';
import AwardList from './AwardList';
import AwardEditForm from './AwardEditForm';
import { useState, useEffect, useCallback } from 'react';
import * as Api from '../../api';

function Award({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [awardList, setAwardList] = useState([]);

  const getAwardList = useCallback(() => {
    Api.get(`awardlist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      setAwardList(data);
      setIsEditing(false);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    getAwardList();
  }, [getAwardList]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        <AwardList
          isEditing={isEditing}
          isEditable={isEditable}
          awardList={awardList}
        />
        {isEditable && (
          <Row className='mt-3 text-center text-info'>
            <Col sm={{ span: 20 }}>
              <Button
                variant='primary'
                onClick={() => setIsEditing((state) => !state)}
              >
                +
              </Button>
            </Col>
          </Row>
        )}
        {isEditing && (
          <AwardEditForm
            setIsEditing={setIsEditing}
            getAwardList={getAwardList}
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Award;
