// formSelectors.js
export const selectSender = (state) => state.form.sender;
export const selectReceiver = (state) => state.form.receiver;
export const selectParcel = (state) => state.form.parcel;
export const selectSenderAddress = (state) => state.form.senderAddress;
export const selectDeliveryAddress = (state) => state.form.deliveryAddress;
export const selectStep = (state) => state.form.step;
export const selectCompleted = (state) => state.form.completed;
export const selectState = (state) => state.form;
export const selectValue = (state) => state.form.value;
