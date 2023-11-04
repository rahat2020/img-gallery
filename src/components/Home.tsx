import { Container, Row, Col, Image, Form } from "react-bootstrap"
import { useState, useEffect } from "react";
import { photoData } from "../data/photoData";
import SortableList, { SortableItem } from 'react-easy-sort'
import { arrayMoveImmutable } from 'array-move'

const Home = () => {
    const [data, setPhotoData] = useState<{ id: number; photo: string; }[]>([]);
    const [items, setItems] = useState(photoData)
    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex))
      }
    console.log(data)
    useEffect(() => {
        return setPhotoData(photoData);
    }, [])
    return (
        <div className="boxContainer">
            <Container>
                <div className="p-3">
                    <div className="box p-3">
                        <div className="d-flex justify-content-between algin-items-center ">
                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="3 selected files" className="fw-bold text-dark" />
                            </Form.Group>
                            <h6 className="text-danger cursor-pointer">Delete Files</h6>
                        </div>
                        <Row className="gy-2">
                            <Col md={5} className="">
                                <Row className="gy-2">
                                    <Col md={12}>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Image src={data[0]?.photo} alt="image" className="rghtImg" />
                                        </div>
                                    </Col>
                                    {
                                        data.slice(0, 2).map((item, index: number) => (
                                            <Col md={6} key={index}>
                                                <Row className="gy-2 my-2">
                                                    <Col md={10} className="border">
                                                        <div className="d-flex justify-content-end align-items-end">
                                                            <Image src={item?.photo} alt="image" className="rghtBottomImg" />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </Col>
                            <Col md={7}>
                                <Row className="gy-3">
                                    {
                                        data.slice(3, 11).map((item, index: number) => (
                                            <Col md={4} key={index} className="">
                                                <div className="d-flex justify-content-center align-items-center colRight">
                                                    <Image src={item?.photo} alt="image" className="leftImg" />
                                                    <div className="imgOverlay">
                                                        <Form.Group className="checkbox" id="formGridCheckbox1">
                                                            <Form.Check type="checkbox" className="m-3"/>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </Col>

                                        ))
                                    }
                                    {/* <div className="imgAdd">
                                        <Form.Control type="file" />
                                    </div> */}
                                </Row>
                            </Col>

                        </Row>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home