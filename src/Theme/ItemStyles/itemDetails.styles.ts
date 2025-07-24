import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@/Theme/colors";
import { texts } from "../texts";

const { width, height } = Dimensions.get("window");
const imageSize = width - 60;
const maxContentWidth = Math.min(width * 0.9, 500);
const descriptionMaxWidth = Math.min(width * 0.7, 440);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  card: {
    width: maxContentWidth,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
    paddingBottom: 30,
    alignSelf: "center",

  },

  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: "#f9f9f9",
    alignSelf: "center",
    
  },
  noImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: "#eee",
    alignSelf: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: texts.fontWeightBold,
    color: colors.text,
    textAlign: "center",
  },
  code: {
    fontSize: 13,
    color: colors.primary,
    textAlign: "center",
    marginTop: 2,
  },
  imageCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#e4e4e4",
    width: "85%",
    marginVertical: 12,
  },

  descriptionHtml: {
    fontSize: 13.3,
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
    alignSelf: "center",
    maxWidth: descriptionMaxWidth,
    fontFamily: "Tajawal",
    letterSpacing: Platform.OS === "android" ? 0.2 : 0.15,
    writingDirection: "rtl",
    marginTop: 8,
  },
  toggleDescription: {
    marginTop: 8,
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },

  buttonsInline: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
    width: "100%",
    gap: 20,
  },

  actionBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#333",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  loadingIndicator: {
    paddingVertical: 60,
  },
  errorText: {
    marginTop: 40,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },

  fullImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    width,
    height,
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.65,
    borderRadius: 16,
    backgroundColor: "#fff",
  },

  statusMenuWrapper: {
    position: "absolute",
    flexDirection: "row",
    top: -40,
    left: "-25%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 6,
    elevation: 6,
    zIndex: 10,
    gap: 10,
  },
  statusIconWrapper: {
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  // statusDivider: {
  //   width: 1.5,
  //   height: 18,
  //   backgroundColor: colors.primary,
  //   alignSelf: "center",
  //   borderRadius: 1,
  // },
  arrowIndicatorWrapper: {
    position: "absolute",
    top: 5.5,
    left: 30,
    zIndex: 11,
  },
  statusIconFixed: {
    alignSelf: "center",
    padding: 4,
    marginVertical: 5,
  },
  statusIcon: {
    width: 20,
    height: 20,
  },

  heartIcon: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },

  topActionsWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  
});
