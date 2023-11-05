import { Container, Row, Col, Image, Form, Button } from "react-bootstrap"
import { useState } from "react";
import { photoData } from "../data/photoData";
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move';

const Home = () => {

    // DRAGING IMPLEMENTAIONS
    const [items, setItems] = useState(photoData)
    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex))
    }

    // SELETING SINGLE AND MULTIPLE PHOTOS
    const [selectedItems, setSelectedItems] = useState<{ id: number; photo: string; }[]>([]);
    const handleCheckboxChange = (item: { id: number; photo: string; }) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
            const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
            setSelectedItems(updatedSelectedItems);
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    // DELETE PHOTO
    const handleDelete = () => {
        const selectedPhotoIds = selectedItems.map(item => item.id);
        const filteredArray = items.filter(item => !selectedPhotoIds.includes(item.id));
        setItems(filteredArray);
        console.log('filteredArray', filteredArray);
    }

    return (
        <div className="boxContainer">
            <Container>
                <div className="p-3 d-flex justify-content-center align-items-center ">
                    <div className="box w-75">
                        <div className="px-4 pe-4 my-2 d-flex justify-content-between algin-items-center border-bottom mb-1">
                            <Form.Group className="mt-2" id="formGridCheckbox">
                                <Form.Check type="checkbox" className="fw-bold text-dark"
                                    label={`${selectedItems.length} selected files`} checked={selectedItems.length > 0 ? true : false} />
                            </Form.Group>
                            <Button className="btn_delete" onClick={handleDelete}>Delete Files</Button>
                        </div>
                        <div className="p-3">
                            <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                                <Row className="gy-2">
                                    <Col md={5}>
                                        <Row className="gy-2">
                                            <Col md={12}>
                                                <div className="d-flex justify-content-end align-items-center colLeft">
                                                    <Image src={items[0]?.photo} alt="image" className="leftImg" />
                                                    <div className="imgOverlay" id={selectedItems.length > 0 ? "checkedValue" : ''}>
                                                        <Form.Group className="checkbox" id="formGridCheckbox1">
                                                            <Form.Check type="checkbox" className='m-3'
                                                                onChange={() => handleCheckboxChange(items[0])}
                                                            />
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </Col>
                                            {
                                                items.slice(0, 2).map((item, index: number) => (
                                                    <SortableItem key={index}>
                                                        <Col md={6} >
                                                            <Row className="gy- my-1">
                                                                <Col md={12} className="">
                                                                    <div className="d-flex justify-content-end align-items-end leftColBottom">
                                                                        <Image src={item?.photo} alt="image" className="leftBottomImg" />
                                                                        <div className="imgOverlay" id={selectedItems.length > 0 ? "checkedValue" : ''}>
                                                                            <Form.Group className="checkbox" id="formGridCheckbox1">
                                                                                <Form.Check type="checkbox" className='m-3'
                                                                                    onChange={() => handleCheckboxChange(items[0])}
                                                                                />
                                                                            </Form.Group>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>

                                                    </SortableItem>
                                                ))
                                            }
                                        </Row>
                                    </Col>
                                    <Col md={7}>
                                        <Row className="gy-3">
                                            {
                                                items.slice(3, 11).map((item, index: number) => (
                                                    <SortableItem key={index}>
                                                        <Col md={4}>
                                                            <div className="d-flex justify-content-center align-items-center colRight">
                                                                <Image src={item?.photo} alt="image" className="rightImg" />
                                                                <div className="imgOverlay" id={selectedItems.length > 0 ? "checkedValue" : ''}>
                                                                    <Form.Group className="checkbox" id="formGridCheckbox1">
                                                                        <Form.Check type="checkbox" className='m-3'
                                                                            onChange={() => handleCheckboxChange(item)}
                                                                        />
                                                                    </Form.Group>
                                                                </div>
                                                            </div>

                                                        </Col>
                                                    </SortableItem>

                                                ))
                                            }
                                            {/* <div className="imgAdd">
                                        <Form.Control type="file" />
                                    </div> */}
                                        </Row>
                                    </Col>

                                </Row>

                            </SortableList>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home