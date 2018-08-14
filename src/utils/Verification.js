export const isInputDirSupported = () => {
  const tmpInput = document.createElement('input');
  if ('webkitdirectory' in tmpInput
    || 'mozdirectory' in tmpInput
    || 'odirectory' in tmpInput
    || 'msdirectory' in tmpInput
    || 'directory' in tmpInput) return true;

  return false;
}