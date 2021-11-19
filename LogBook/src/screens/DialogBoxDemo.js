import React, {useState} from 'react';
import {StyleSheet, Vibration} from 'react-native';
import {Button, Layout, Text, Modal} from '@ui-kitten/components';
import ringring from '../../public/sound.mp3';
import Sound from 'react-native-sound';

const DialogBoxDemo = () => {
  //USE-STATE
  const [modalStatus, setModalStatus] = useState(false);

  const bell = new Sound(ringring, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log(error);
    }
  });
  bell.setVolume(10);
  const handleBell = () => {
    bell.play(success => {
      if (!success) {
        return console.log('Sound did not play');
      }
    });
  };

  return (
    <Layout style={styles.container}>
      <Text>DEMO DIALOG</Text>
      <Button style={styles.openModalBtn} onPress={() => setModalStatus(true)}>
        Open dialog
      </Button>
      <Modal
        visible={modalStatus}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalStatus(false)}>
        <Layout style={styles.modalView}>
          <Text style={styles.modalLabel}>
            Demo "ring a bell" and "vibrate"
          </Text>
          <Button style={styles.modalFuncBtn} onPress={() => handleBell()}>
            Ring
          </Button>
          <Button
            style={styles.modalFuncBtn}
            onPress={() => Vibration.vibrate(2000)}>
            Brm
          </Button>
          <Button
            style={styles.modalFuncBtn}
            onPress={() => setModalStatus(false)}>
            Cancel
          </Button>
        </Layout>
      </Modal>
    </Layout>
  );
};

export default DialogBoxDemo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openModalBtn: {
    marginTop: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    height: 250,
    alignItems: 'center',
    borderRadius: 10,
  },
  modalLabel: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  modalFuncBtn: {
    width: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});
