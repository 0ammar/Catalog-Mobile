import { StyleSheet } from "react-native";
import { colors, spaces, texts } from "@/Theme";

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 23,
    paddingBottom: 20,
    marginTop: spaces.screenMargin,
    marginBottom: spaces.screenMargin,
  },
  titleWrapper: {
    alignItems: "center",
    marginTop: spaces.xs ,
    marginBottom: spaces.md,
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#A01515",
  },
  titleUnderline: {
    top: "30%",
    width: "60%",
    height: 1.5,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
