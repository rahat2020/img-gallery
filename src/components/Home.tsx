import { Container, Row, Col, Image, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react";
import { photoData } from "../data/photoData";
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move';

type PhotoArrya = {
    id: number,
    photo: string
}

const Home = () => {
    const [items, setItems] = useState(photoData)

    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex))
    }

    const [selectedItems, setSelectedItems] = useState<{ id: number; photo: string; }[]>([]);


    // console.log('checkedItems', checkedItems)
    // console.log('selectedItems', selectedItems)

    // selected images
    const handleCheckboxChange = (item: { id: number; photo: string; }) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
        if (isSelected) {
            const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
            setSelectedItems(updatedSelectedItems);
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    //   delete image
    // const handleDelete = () => {
    //     const newArray = items;
    //     const selectedPhoto = selectedItems.map(item => { return item.id })
    //     console.log('selectedItems', selectedPhoto)
    //     const filteredArray = newArray.filter((elm, i) => {
    //         return i !== selectedPhoto 

    //     })
    //     setItems(filteredArray)
    // }
    const handleDelete = () => {
        const selectedPhotoIds = selectedItems.map(item => item.id);
        console.log('selectedItems', selectedPhotoIds);
        
        const filteredArray = items.filter(item => !selectedPhotoIds.includes(item.id));
        setItems(filteredArray);
        console.log('filteredArray', filteredArray);
      }

    return (
        <div className="boxContainer">
            <Container>
                <div className="p-3">
                    <div className="box p-3">
                        <div className="d-flex justify-content-between algin-items-center">
                            <Form.Group className="mb-3 d-flex justify-content-center align-items-center" id="formGridCheckbox">
                                <Form.Check type="checkbox" className="fw-bold text-dark"
                                    label={`${selectedItems.length} selected files`} checked={selectedItems.length > 0 ? true : false} />
                            </Form.Group>
                            <Button className="btn_delete" onClick={handleDelete}>Delete Files</Button>
                        </div>
                        <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                            <Row className="gy-2">
                                <Col md={5} className="">
                                    <Row className="gy-2">
                                        <Col md={12}>
                                            <div className="d-flex justify-content-end align-items-center">
                                                <Image src={items[0]?.photo} alt="image" className="rghtImg" />
                                            </div>
                                        </Col>
                                        {
                                            items.slice(0, 2).map((item, index: number) => (
                                                <SortableItem key={index}>
                                                    <Col md={6} >
                                                        <Row className="gy-2 my-2">
                                                            <Col md={10} className="border">
                                                                <div className="d-flex justify-content-end align-items-end">
                                                                    <Image src={item?.photo} alt="image" className="rghtBottomImg" />
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
                                                            <Image src={item?.photo} alt="image" className="leftImg" />
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
            </Container>
        </div>
    )
}

export default Home