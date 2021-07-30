import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const fulWidth = width / 1;
const f105Width = width / 1.05;
const l22Width = width / 2.2;
const equalWidth = width / 2;
const tierWidth = width / 3;
const fulHeight = height / 1;
const equalHeight = height / 2;
const tierHeight = height / 3;

export default StyleSheet.create({
  // Footer

  footerContainer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 70,
    alignSelf: "center",
    elevation: 3,
    right: 0,
    left: 0,
  },

  footerContentCentered: {
    justifyContent: "center",
    alignItems: "center",
  },

  footerFavContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  footerCartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  footerVoiceContainer: {
    // elevation: 3,
    height: 70,
    width: 70,
    backgroundColor: "#DA7200",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 60,
  },
});
