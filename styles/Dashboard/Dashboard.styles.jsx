import { StyleSheet } from "react-native";

const Dashs = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      paddingBottom: 30,
    },
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5", 
      padding: 20,
    }, 
    board: {
      width: "100%",    
      borderRadius: 10,
      overflow: "hidden",
    },
    boardImage: {
      justifyContent: "flex-end",
    },
    boardContent: {
      paddingHorizontal: 30,
      paddingVertical: 30,
      gap:10,
      // backgroundColor: "rgba(10, 46, 226, 0.7)",  
      borderRadius: 9,
    },
    balanceText: {
       fontFamily: 'Sora',
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 17.64,
      letterSpacing: 2,
      opacity: 0.5,
      color: "#fff",
    },
    balanceAmount: {
      fontFamily: 'Sora',
      fontWeight: "700",
      fontSize: 28,
      lineHeight: 32.28,
      // letterSpacing: -2,
      color: "#fff",
    },
    holderText: {
      fontFamily: 'Sora',
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 17.58,
      opacity: 0.5,
      color: "#fff",
    },
    holderName: {
      fontFamily: 'Sora',
      fontWeight: "700",
      fontSize: 18,
      lineHeight: 26.37,
      color: "#fff",
    },
    quickActionsContainer: {
       marginBottom: 20,
      marginTop: 20,
    },
    sectionTitle: {
      fontFamily: 'SofiaPro',
      fontSize: 18,
      fontWeight: "600",
      color: "#23303B",
      marginBottom: 10,
    },
    actionBoxesContainer: {
      flexDirection: "row",
      // justifyContent: "center",
      flexWrap: "wrap",
    },
    actionBoxContainer: {
      width: "30%",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    actionBox: {
      backgroundColor: "#4CAF50",
      padding: 20,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 30,
    },
    actionBoxText: {
      fontFamily: 'Poppins',
      color: "#8E949A",
      fontWeight: "500",
      fontSize: 13,
      lineHeight: 19.5,
      marginTop: 5,
      textAlign: "center",
    },
    recentTransactionsContainer: {
     },
    recentTransactionsHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 1,
     },
    transactionItem: {
      backgroundColor: "#fff",
      paddingVertical: 15,
      paddingHorizontal:10,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
       borderRadius: 8,
       justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    transactionRow: {
      flexDirection: "row",
      alignItems: "center",
      gap:10
    },
    transactionIcon: {
      backgroundColor: "#d9f3df",
      borderRadius: 5,
      padding: "4%",
    },
    transactionDetails: {
      flexDirection: "column",
      marginLeft: 1,
    },
    transactionInfo: {
      flexDirection: "row",
      justifyContent: "flex-start",
      marginTop: 5,
    },
    transactionText: {
      fontSize: 16,
      color: "#333",
    },
  });

  export default Dashs