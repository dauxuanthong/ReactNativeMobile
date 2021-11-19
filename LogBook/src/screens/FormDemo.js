import React, {useState} from 'react';
import {StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Modal,
  Select,
  SelectItem,
  Datepicker,
  Input,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';

const FormDemo = () => {
  //STATE
  const [modalStatus, setModalStatus] = useState(false);
  const [formData, setFormData] = useState({});
  const [sysTitle, setSysTitle] = useState('');
  const [sysMessage, setSysMessage] = useState('');
  const [errorModalStatus, setErrorModalStatus] = useState(false);

  //SELECT-DATA
  const propertyData = ['Flat', 'House', 'Bungalow'];
  const roomsData = ['Studio', '1 room', '2 rooms', '3 rooms', '4 rooms'];
  const furnitureData = ['Furnished', 'Unfurnished', 'Part Furnished'];
  const handleSelect = (objectIndex, arrayData) => {
    const numbIndex = objectIndex.row;
    return arrayData[numbIndex];
  };
  //VALIDATE
  const validateSchema = Yup.object().shape({
    address: Yup.string().max(50).required(),
    propertyType: Yup.string().required(),
    bedrooms: Yup.string().required(),
    startDate: Yup.mixed().required(),
    endDate: Yup.mixed().required(),
    price: Yup.number().min(1).required(),
    name: Yup.string().max(50).required(),
    note: Yup.string().max(500),
  });

  //FUNC
  const dollar = () => {
    return <Text>$</Text>;
  };

  const handleSubmitModal = async resetForm => {
    try {
      const saveDataRes = await axios.post(
        'http://10.0.2.2:3009/rentalZLogBook/saveData',
        formData,
      );
      setModalStatus(false);
      console.log(saveDataRes.data.Message);
      if (saveDataRes.data.Message === 'DuplicateError') {
        return ToastAndroid.show(
          'This address already exists, please try another address!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          30,
          100,
        );
      }
      if (saveDataRes.data.Message === 'internalError') {
        return ToastAndroid.show(
          'An error occurred on the server. Please try it again!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          30,
          100,
        );
      }
      // resetForm();
      resetForm();
      return ToastAndroid.show(
        'Your information has been updated on the rental list!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        30,
        100,
      );
    } catch (error) {
      console.log(error);
      setSysTitle('Upload failed');
      setSysMessage('An error occurred on the server. Please try it again!');
      return setErrorModalStatus(true);
    }
  };

  //RENDER
  return (
    <Formik
      initialValues={{
        address: '',
        propertyType: null,
        bedrooms: null,
        startDate: null,
        endDate: null,
        price: null,
        furnitureType: null,
        name: '',
        note: '',
      }}
      validationSchema={validateSchema}
      onSubmit={async (values, {resetForm}) => {
        setFormData(values);
        return setModalStatus(true);
      }}>
      {({
        resetForm,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Layout style={{flex: 1, width: '100%', height: '100%'}}>
          <ScrollView style={{flex: 1, width: '100%', height: '100%'}}>
            <Layout style={styles.container}>
              <Text style={styles.title}>RentalZ</Text>
              <Layout style={styles.formLayout}>
                {/*User name*/}
                <Layout style={styles.fieldLayout}>
                  <Layout style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>User name</Text>
                    <Text style={styles.requireLabel}> *</Text>
                  </Layout>
                  <Input
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  <Text style={styles.errorLabel}>
                    {errors.name && touched.name
                      ? 'This field is required (max 50 characters)'
                      : null}
                  </Text>
                </Layout>
                {/*Address*/}
                <Layout style={styles.fieldLayout}>
                  <Layout style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>Address</Text>
                    <Text style={styles.requireLabel}> *</Text>
                  </Layout>
                  <Input
                    value={values.address}
                    onChangeText={handleChange('address')}
                  />
                  <Text style={styles.errorLabel}>
                    {errors.address && touched.address
                      ? 'This field is required (max 50 characters)'
                      : null}
                  </Text>
                </Layout>
                {/*Property type*/}
                <Layout style={styles.fieldLayout}>
                  <Layout style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>Property type</Text>
                    <Text style={styles.requireLabel}> *</Text>
                  </Layout>
                  <Select
                    fieldName="propertyType"
                    value={values.propertyType}
                    onSelect={index => {
                      // const type = ;
                      setFieldValue(
                        'propertyType',
                        handleSelect(index, propertyData),
                      );
                    }}
                    // onBlur={handleBlur('propertyType')}
                  >
                    {propertyData.map(item => (
                      <SelectItem key={item} title={item} />
                    ))}
                  </Select>
                  <Text style={styles.errorLabel}>
                    {errors.propertyType && touched.propertyType
                      ? 'This field is required'
                      : null}
                  </Text>
                </Layout>
                {/*Bedrooms*/}
                <Layout style={styles.fieldLayout}>
                  <Layout style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>Bedrooms</Text>
                    <Text style={styles.requireLabel}> *</Text>
                  </Layout>
                  <Select
                    value={values.bedrooms}
                    onSelect={index => {
                      setFieldValue('bedrooms', handleSelect(index, roomsData));
                    }}>
                    {roomsData.map(item => (
                      <SelectItem key={item} title={item} />
                    ))}
                  </Select>
                  <Text style={styles.errorLabel}>
                    {errors.bedrooms && touched.bedrooms
                      ? 'This field is required'
                      : null}
                  </Text>
                </Layout>
                {/*Date-Time*/}
                <Layout style={styles.fieldLayout}>
                  <Layout style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.requireLabel}> *</Text>
                  </Layout>
                  <Layout style={styles.dateLayout}>
                    <Datepicker
                      style={styles.datePicker}
                      placeholder="Start date"
                      min={new Date()}
                      date={values.startDate}
                      onSelect={nextDate => {
                        setFieldValue('startDate', nextDate);
                      }}
                    />
                    <Datepicker
                      disabled={values.startDate ? false : true}
                      style={styles.datePicker}
                      placeholder="End Date"
                      placement="bottom end"
                      min={
                        values.startDate
                          ? new Date(
                              values.startDate.getFullYear(),
                              values.startDate.getMonth(),
                              values.startDate.getDate() + 1,
                            )
                          : new Date()
                      }
                      date={values.endDate}
                      onSelect={nextDate => {
                        setFieldValue('endDate', nextDate);
                      }}
                    />
                  </Layout>
                  <Text style={styles.errorLabel}>
                    {(errors.startDate && touched.startDate) ||
                    (errors.endDate && touched.endDate)
                      ? 'This field is required'
                      : null}
                  </Text>
                </Layout>
                {/*Price*/}
                <Layout style={styles.fieldLayout}>
                  <Layout style={{flexDirection: 'row'}}>
                    <Text style={styles.label}>Monthly rent price</Text>
                    <Text style={styles.requireLabel}> *</Text>
                  </Layout>
                  <Input
                    accessoryRight={dollar}
                    keyboardType="numeric"
                    value={values.price}
                    onChangeText={value => {
                      setFieldValue('price', value.replace(/[^\d]/g, ''));
                    }}
                  />
                  <Text style={styles.errorLabel}>
                    {errors.price && touched.price
                      ? 'Minimum price is 1 dollar'
                      : null}
                  </Text>
                </Layout>
                {/*Furniture types*/}
                <Layout style={styles.fieldLayout}>
                  <Text style={styles.label}>Furniture types</Text>
                  <Select
                    value={values.furnitureType}
                    onSelect={index => {
                      setFieldValue(
                        'furnitureType',
                        handleSelect(index, furnitureData),
                      );
                    }}>
                    {furnitureData.map(item => (
                      <SelectItem key={item} title={item} />
                    ))}
                  </Select>
                </Layout>

                {/*Notes*/}
                <Layout style={styles.fieldNoteLayout}>
                  <Text style={styles.label}>Notes</Text>
                  <Input
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}
                    multiline={true}
                    textStyle={{minHeight: 64, maxHeight: 64, margin: 0}}
                    value={values.note}
                    onChangeText={handleChange('note')}
                  />
                  <Text style={styles.errorLabel}>
                    {errors.note && touched.note
                      ? 'Maximum 500 characters'
                      : null}
                  </Text>
                </Layout>
                <Button style={styles.submitBtn} onPress={handleSubmit}>
                  Submit
                </Button>
              </Layout>
            </Layout>
            <Modal
              visible={modalStatus}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setModalStatus(false)}>
              <Layout style={styles.modalView}>
                <Text style={styles.modalLabel}>Confirm data</Text>
                <ScrollView style={styles.modalScroll}>
                  {/*name*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>User name: </Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>{values.name}</Text>
                    </Layout>
                  </Layout>
                  {/*Address*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>Address:</Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>{values.address}</Text>
                    </Layout>
                  </Layout>
                  {/*propertyType*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>
                        Property type:{' '}
                      </Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>{values.propertyType}</Text>
                    </Layout>
                  </Layout>
                  {/*bedrooms*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>Bedrooms: </Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>{values.bedrooms}</Text>
                    </Layout>
                  </Layout>
                  {/*startDate*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>Start date:</Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>
                        {moment(values.startDate).format('YYYY-MM-DD')}
                      </Text>
                    </Layout>
                  </Layout>
                  {/*endDate*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>End date:</Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>{moment(values.endDate).format('YYYY-MM-DD')}</Text>
                    </Layout>
                  </Layout>
                  {/*price*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>Price:</Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>{values.price} $</Text>
                    </Layout>
                  </Layout>
                  {/*furnitureType*/}
                  <Layout style={styles.infoModal}>
                    <Layout style={styles.leftInfoModal}>
                      <Text style={styles.leftInfoModalText}>
                        Furniture type:
                      </Text>
                    </Layout>
                    <Layout style={styles.rightInfoModal}>
                      <Text>
                        {typeof values.furnitureType === 'object'
                          ? 'null'
                          : values.furnitureType}
                      </Text>
                    </Layout>
                  </Layout>
                  {/*Note*/}
                  <Layout style={styles.infoModal}>
                    <Text>
                      Note: {values.note === '' ? 'null' : values.note}
                    </Text>
                  </Layout>
                </ScrollView>
                <Layout style={styles.modalBtn}>
                  <Button
                    style={{...styles.modalFuncBtn, backgroundColor: 'red'}}
                    onPress={() => setModalStatus(false)}>
                    CANCEL
                  </Button>
                  <Button
                    style={{...styles.modalFuncBtn, backgroundColor: 'green'}}
                    onPress={() => handleSubmitModal(resetForm)}>
                    SUBMIT
                  </Button>
                </Layout>
              </Layout>
            </Modal>
          </ScrollView>
        </Layout>
      )}
    </Formik>
  );
};

export default FormDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  formLayout: {
    width: 300,
    alignItems: 'center',
  },
  fieldLayout: {
    width: '100%',
    height: 93,
  },
  label: {
    fontSize: 19,
    marginBottom: 3,
  },
  requireLabel: {
    color: 'red',
  },
  errorLabel: {
    marginTop: 2,
    color: 'red',
  },
  dateLayout: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    width: '47%',
  },
  fieldNoteLayout: {
    width: '100%',
    height: 100,
  },
  submitBtn: {
    marginTop: 35,
    marginBottom: 20,
    width: 100,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 350,
    height: 500,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  modalLabel: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 20,
  },
  modalScroll: {
    width: '90%',
  },
  infoModal: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 5,
  },
  leftInfoModal: {
    width: '40%',
  },
  rightInfoModal: {
    width: '55%',
  },
  modalBtn: {
    width: '100%',
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalFuncBtn: {
    width: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
