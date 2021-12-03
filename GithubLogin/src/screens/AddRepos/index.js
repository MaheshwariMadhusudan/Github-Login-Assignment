import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {colors, spacing, scales} from '../../constants/appStyles';
import {useUserInfo} from '../../contexts/userInfo';
import Environment from '../../config/environment';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import InputBox from '../../components/InputBox';
import RadioButton from '../../components/RadioButton';
import Toast from 'react-native-simple-toast';

const AddRepos = props => {
  const {navigation} = props;
  const {accessToken} = useUserInfo();
  const [repoName, setRepoName] = useState('');
  const [privateRepo, setPrivacyStatus] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeRepoName = text => {
    setRepoName(text);
  };

  const onChangeDescription = text => {
    setDescription(text);
  };

  const clearAllFields = () => {
    setPrivacyStatus(false);
    setRepoName('');
    setDescription('');
  };

  const onPressSubmit = () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      name: repoName,
      private: privateRepo,
      description,
    };
    setLoading(true);
    axios
      .post(`${Environment.API_BASE_URL}user/repos`, data, {
        headers: headers,
      })
      .then(response => {
        Toast.show('Repo Created Successfully!');
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Error!', JSON.stringify(err.message), [
          {text: 'OK', onPress: () => {}},
        ]);
      })
      .finally(() => {
        clearAllFields();
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add Repos" onBackPress={() => navigation.goBack()} />
      {loading ? (
        <View style={styles.loaderContainer}>
          <Loader color={colors.primary} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <View style={styles.reposListContainer}>
            <InputBox
              label="Repo Name"
              placeholder="Enter Repo Name"
              placeholderTextColor={colors.greyFour}
              inputBoxContainerStyle={styles.inputContainerStyles}
              onChangeText={onChangeRepoName}
              value={repoName}
            />
            <Text style={styles.privacyFieldLabel}>Privacy</Text>
            <View style={styles.radioButtonsContainer}>
              <RadioButton
                label="Private"
                isSelected={privateRepo}
                onPress={() => setPrivacyStatus(true)}
              />
              <RadioButton
                label="Public"
                isSelected={!privateRepo}
                onPress={() => setPrivacyStatus(false)}
              />
            </View>
            <InputBox
              label="Repo Description"
              placeholder="Enter Repo Description"
              placeholderTextColor={colors.greyFour}
              inputBoxContainerStyle={styles.inputContainerStyles}
              onChangeText={onChangeDescription}
              value={description}
            />
          </View>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              disabled={repoName.length === 0 || description.length === 0}
              onPress={onPressSubmit}
              style={
                repoName.length && description.length
                  ? styles.paginationButton
                  : styles.disabledButton
              }>
              <Text style={styles.paginationButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  reposListContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyles: {
    paddingHorizontal: spacing(12),
    marginTop: spacing(20),
  },
  radioButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: spacing(7),
    paddingHorizontal: spacing(12),
  },
  privacyFieldLabel: {
    marginLeft: spacing(12),
    marginTop: spacing(20),
  },
  paginationButton: {
    backgroundColor: colors.primary,
    height: scales(40),
    width: scales(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scales(8),
  },
  paginationButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#646870',
    height: scales(40),
    width: scales(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scales(8),
  },
  submitButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(20),
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddRepos;
