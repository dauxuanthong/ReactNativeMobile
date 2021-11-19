import React, {useState, useEffect} from 'react';
import {StyleSheet, ToastAndroid, FlatList, Image} from 'react-native';
import {Button, Layout, Text, Modal, Input, Icon} from '@ui-kitten/components';
import axios from 'axios';
import moment from 'moment';
//Item
const Item = ({data, editFunc, deleteFunc}) => (
  <Layout style={styles.itemContainer}>
    <Layout style={styles.infoLayout}>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>User name: </Text>
        <Text style={styles.info}>{data.name}</Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>Address: </Text>
        <Text style={styles.info}>{data.address}</Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>PropertyType: </Text>
        <Text style={styles.info}>{data.propertyType}</Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>bedroom: </Text>
        <Text style={styles.info}>{data.bedrooms}</Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>Start date: </Text>
        <Text style={styles.info}>
          {moment(data.startDate).format('YYYY-MM-DD')}
        </Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>End date: </Text>
        <Text style={styles.info}>
          {moment(data.endDate).format('YYYY-MM-DD')}
        </Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>Price: </Text>
        <Text style={styles.info}>{data.price} $</Text>
      </Layout>
      <Layout style={styles.fieldLayout}>
        <Text style={styles.label}>FurnitureType: </Text>
        <Text style={styles.info}>{data.furnitureType}</Text>
      </Layout>
      <Layout style={styles.itemButtonLayout}>
        <Button
          style={styles.itemBtn}
          onPress={() => {
            editFunc(
              data.id,
              data.propertyType,
              data.bedrooms,
              data.furnitureType,
            );
          }}>
          Edit
        </Button>
        <Button
          style={styles.itemBtn}
          onPress={() => {
            deleteFunc(data.id);
          }}>
          Delete
        </Button>
      </Layout>
    </Layout>
  </Layout>
);

const ListRentalZ = () => {
  //STATE
  const [searchValue, setSearchValue] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({
    propertyType: '',
    bedrooms: '',
    furnitureType: '',
  });
  const [currentEditNote, setCurrentEditNote] = useState({
    userId: '',
    propertyTypeNote: '',
    bedroomsNote: '',
    furnitureTypeNote: '',
  });
  const [modalEdit, setModalEdit] = useState(false);
  const [listData, setListData] = useState([
    {
      id: 0,
      address: '36 the lu',
      propertyType: 'propertyType',
      bedrooms: 'bedrooms',
      startDate: 'startDate',
      endDate: 'endDate',
      price: 'price',
      furnitureType: '',
      name: 'Thong',
    },
  ]);
  //EFFECT
  useEffect(() => {
    const getRentalList = async () => {
      const rentalListRes = await axios.get(
        'http://10.0.2.2:3009/rentalZLogBook/rentalList',
      );
      const list = rentalListRes.data.reverse();
      setListData(list);
    };
    getRentalList();
  }, []);
  //FUNCTION
  //search input
  const search = async () => {
    if (searchValue.trim().length === 0) {
      const searchReq = await axios.get(
        'http://10.0.2.2:3009/rentalZLogBook/rentalList',
      );
      return setListData(searchReq.data);
    } else {
      const searchReq = await axios.get(
        `http://10.0.2.2:3009/rentalZLogBook/${searchValue}`,
      );
      if (searchReq.data.Message === 'NOPE') {
        return ToastAndroid.show(
          'No match found!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          30,
          100,
        );
      }
      return setListData(searchReq.data);
    }
  };

  //Render item
  const renderItem = ({item}) => (
    <Item
      data={item}
      editFunc={handleEdit}
      deleteFunc={handleDelete}
      editFunc={handleEdit}
    />
  );

  //Function
  const handleEdit = async (id, propertyType, bedrooms, furnitureType) => {
    try {
      const currentNoteRes = await axios.get(
        `http://10.0.2.2:3009/rentalZLogBook/currentNote/${id}`,
      );
      setCurrentEditNote(currentNoteRes.data);
    } catch (error) {
      console.log(error);
    }
    setCurrentEdit({
      propertyType: propertyType,
      bedrooms: bedrooms,
      furnitureType: furnitureType,
    });

    setModalEdit(true);
  };

  const handleDelete = id => {
    setCurrentItem(id);
    setModalStatus(true);
  };

  const deleteItem = async () => {
    setModalStatus(false);
    const deleteItemRes = await axios.post(
      'http://10.0.2.2:3009/rentalZLogBook/deleteItem',
      {id: currentItem},
    );
    if (deleteItemRes.data.message === 'OK') {
      setListData(pre => {
        return [...pre.filter(item => item.id !== currentItem)];
      });
      return ToastAndroid.show(
        'Item removed successfully!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        30,
        100,
      );
    } else {
      return ToastAndroid.show(
        'An error occurred on the server, please try again later!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        30,
        100,
      );
    }
  };

  const editItem = async () => {
    try {
      const editRes = await axios.post(
        'http://10.0.2.2:3009/rentalZLogBook/editItem',
        currentEditNote,
      );
      setModalEdit(false);
      setCurrentEditNote({
        userId: '',
        propertyTypeNote: '',
        bedroomsNote: '',
        furnitureTypeNote: '',
      });
      if (editRes.data.message === 'OK') {
        return ToastAndroid.show(
          'Add note successfully',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          30,
          100,
        );
      } else {
        return ToastAndroid.show(
          'An error occurred on the server, please try again later!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          30,
          100,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Layout style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.title}>RENTALZ LIST</Text>
      </Layout>
      <Input
        style={styles.searchInput}
        placeholder="Search address"
        accessoryRight={
          <Button
            onPress={search}
            appearance="ghost"
            accessoryLeft={<Icon name="search-outline" />}
          />
        }
        value={searchValue}
        onChangeText={value => {
          setSearchValue(value);
        }}></Input>
      <Layout style={styles.listLayout}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={item => item.id}></FlatList>
      </Layout>
      <Modal
        visible={modalStatus}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalStatus(false)}>
        <Layout style={styles.deleteModalLayout}>
          <Text style={styles.deleteModalTitle}>
            Are you sure to delete this?
          </Text>
          <Layout style={styles.deleteBtnLayout}>
            <Button
              style={styles.deleteBtn}
              onPress={() => setModalStatus(false)}>
              Cancel
            </Button>
            <Button
              style={{...styles.deleteBtn, backgroundColor: 'red'}}
              onPress={() => deleteItem()}>
              Delete
            </Button>
          </Layout>
        </Layout>
      </Modal>
      <Modal
        visible={modalEdit}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setModalEdit(false);
          setCurrentEditNote({
            userId: '',
            propertyTypeNote: '',
            bedroomsNote: '',
            furnitureTypeNote: '',
          });
        }}>
        <Layout style={styles.editModalLayout}>
          <Text style={{fontSize: 20, marginBottom: 10}}>ADD NOTE</Text>
          <Layout style={styles.editModalItemLayout}>
            <Layout style={styles.fieldLayout}>
              <Text style={styles.label}>PropertyType: </Text>
              <Text style={styles.info}>{currentEdit.propertyType}</Text>
            </Layout>
            <Input
              style={styles.editNote}
              multiline={true}
              textStyle={{minHeight: 64, maxHeight: 64, margin: 0}}
              value={currentEditNote.propertyTypeNote}
              onChangeText={value => {
                setCurrentEditNote({
                  ...currentEditNote,
                  propertyTypeNote: value,
                });
              }}
            />
          </Layout>
          <Layout style={styles.editModalItemLayout}>
            <Layout style={styles.fieldLayout}>
              <Text style={styles.label}>Bedrooms: </Text>
              <Text style={styles.info}>{currentEdit.bedrooms}</Text>
            </Layout>
            <Input
              style={styles.editNote}
              multiline={true}
              textStyle={{minHeight: 64, maxHeight: 64, margin: 0}}
              value={currentEditNote.bedroomsNote}
              onChangeText={value => {
                setCurrentEditNote({...currentEditNote, bedroomsNote: value});
              }}
            />
          </Layout>
          <Layout style={styles.editModalItemLayout}>
            <Layout style={styles.fieldLayout}>
              <Text style={styles.label}>FurnitureType: </Text>
              <Text style={styles.info}>
                {currentEdit.furnitureType === null
                  ? 'null'
                  : currentEdit.furnitureType}
              </Text>
            </Layout>
            <Input
              disabled={currentEdit.furnitureType === null ? true : false}
              style={styles.editNote}
              multiline={true}
              textStyle={{minHeight: 64, maxHeight: 64, margin: 0}}
              value={currentEditNote.furnitureTypeNote}
              onChangeText={value => {
                setCurrentEditNote({
                  ...currentEditNote,
                  furnitureTypeNote: value,
                });
              }}
            />
          </Layout>
          <Layout style={styles.deleteBtnLayout}>
            <Button
              onPress={() => {
                setModalEdit(false);
                setCurrentEditNote({
                  userId: '',
                  propertyTypeNote: '',
                  bedroomsNote: '',
                  furnitureTypeNote: '',
                });
              }}>
              Cancel
            </Button>
            <Button onPress={() => editItem()}>Edit</Button>
          </Layout>
        </Layout>
      </Modal>
    </Layout>
  );
};

export default ListRentalZ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  searchInput: {
    width: '90%',
    marginBottom: 10,
  },
  itemContainer: {
    width: '95%',
  },
  listLayout: {
    height: 470,
  },
  infoLayout: {
    marginTop: 10,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: 'grey',
    width: 350,
    padding: 10,
  },
  fieldLayout: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 17,
    marginLeft: 5,
  },
  itemButtonLayout: {
    marginTop: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 310,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemBtn: {
    width: 100,
    height: 45,
    borderRadius: 10,
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  deleteModalLayout: {
    borderRadius: 10,
    width: 250,
    height: 140,
    alignItems: 'center',
  },
  deleteModalTitle: {
    marginTop: 20,
    fontSize: 17,
    marginBottom: 20,
  },
  deleteBtnLayout: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  editModalLayout: {
    width: 300,

    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  editModalItemLayout: {
    width: '90%',
  },
  editNote: {
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
