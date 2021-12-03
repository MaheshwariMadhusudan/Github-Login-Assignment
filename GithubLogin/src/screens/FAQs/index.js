import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Linking,
} from 'react-native';
import {fontSize, colors, spacing} from '../../constants/appStyles';
import {useUserInfo} from '../../contexts/userInfo';
import Header from '../../components/Header';
import Environment from '../../config/environment';

const FaqText = `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text ever
since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five
centuries, but also the leap into electronic typesetting, remaining
essentially unchanged. It was popularised in the 1960s with the release
of Letraset sheets containing Lorem Ipsum passages, and more recently
with desktop publishing software like Aldus PageMaker including versions
of Lorem Ipsum.`;

const FAQs = props => {
  const {navigation, route} = props;
  const {params} = route;
  const {isLoggedIn} = useUserInfo();

  const openProfile = () => {
    const url = `${Environment.BASE_URL}${params.profileDetails.login}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  const ProfileLinkText = () => {
    return (
      <TouchableOpacity onPress={() => openProfile()}>
        <Text style={styles.bottomSheetLink}>
          Click here to visit your profile.
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="FAQs" onBackPress={() => navigation.goBack()} />
      <View style={styles.faqContainer}>
        <Text style={styles.faqText}>{FaqText}</Text>
        {isLoggedIn && <ProfileLinkText />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  faqContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: spacing(10),
  },
  bottomSheetLink: {
    color: colors.primary,
    fontSize: fontSize(18),
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  },
  faqText: {
    color: colors.black,
    fontSize: fontSize(18),
    textDecorationColor: colors.primary,
  },
});

export default FAQs;
