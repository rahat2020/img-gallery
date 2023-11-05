import { Container, Image, Form, Button } from "react-bootstrap"
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
        setSelectedItems([]);
        console.log('filteredArray', filteredArray);
      }
      
 

    return (
        <div className="boxContainer">
            <Container>
                <div className="p-3 d-flex justify-content-center align-items-center ">
                    <div className="box ">
                        <div className="px-4 pe-4 my-2 d-flex justify-content-between algin-items-center border-bottom mb-1">
                            <Form.Group className="mt-2" id="formGridCheckbox">
                                <Form.Check type="checkbox" className="fw-bold text-dark"
                                    label={`${selectedItems.length} selected files`} checked={selectedItems.length > 0 ? true : false} />
                            </Form.Group>
                            <Button className="btn_delete" onClick={handleDelete}>Delete Files</Button>
                        </div>

                        <section className="p-3 w-100">
                            <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                                <div className="grid_row">
                                    {
                                        items?.map((item, index: number) => (
                                            <div className={`${index === 0 ? "test-cls" : ""}`} key={index}>
                                                <SortableItem>
                                                    <div className="gallery__item d-flex justify-content-center align-items-center">
                                                        <Image src={item?.photo} alt="image" className="gallery__item_img" />
                                                        <div className="imgOverlay" id={selectedItems.length > 0 ? "checkedValue" : ''}>
                                                            <Form.Group className="checkbox" id="formGridCheckbox1">
                                                                <Form.Check type="checkbox" className='m-3'
                                                                    onChange={() => handleCheckboxChange(item)}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </SortableItem>
                                            </div>
                                        ))
                                    }
                                </div>
                            </SortableList>
                        </section>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home