import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const DocumentUpload = async (
  onSuccess: (res: any) => void,
  onError?: (e: any) => void,
  documentType?: string,
) => {
  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      __DEV__ && console.log('cancelled');
    } else if (isInProgress(err)) {
      __DEV__ &&
        console.log(
          'multiple pickers were opened, only the last will be considered',
        );
    } else {
      throw err;
    }
  };

  try {
    const pickerResult = await DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
    });
    onSuccess(pickerResult);
  } catch (e) {
    onError ? onError(e) : null;
    handleError(e);
  }
};
export default DocumentUpload;
