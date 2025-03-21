import React from "react";
import TypeSelector from "../components/create/TypeSelector";
import MediaPreview from "../components/create/MediaPreview";
import SelectMedia from "../components/create/steps/SelectMedia";
import EditMedia from "../components/create/steps/EditMedia";
import AddDetails from "../components/create/steps/AddDetails";

const Create = () => {
  const [selectedType, setSelectedType] = React.useState("Post");
  const [currentStep, setCurrentStep] = React.useState(1);
  const [mediaUrl, setMediaUrl] = React.useState(null);
  const [mediaType, setMediaType] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  const [description, setDescription] = React.useState("");

  const isValidMediaType = (type, mediaType) => {
    switch (type) {
      case "Post":
        return mediaType === "image";
      case "Clip":
        return mediaType === "video";
      default:
        return false;
    }
  };

  const [imageSettings, setImageSettings] = React.useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    rotation: 0,
    filterName: 'Original'
  });

  const handleMediaSelect = (url, type) => {
    if (!isValidMediaType(selectedType, type)) {
      alert(`${selectedType}s only support ${selectedType === "Post" ? "images" : "videos"}`);
      return;
    }
    setMediaUrl(url);
    setMediaType(type);
    setCurrentStep(2);
  };

  const maxSteps = selectedType === "Clip" ? 2 : 3;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectMedia onMediaSelect={handleMediaSelect} />;
      case 2:
        return selectedType === "Clip" ? 
          <AddDetails 
            caption={caption} 
            setCaption={setCaption} 
            description={description} 
            setDescription={setDescription} 
          /> : 
          <EditMedia mediaUrl={mediaUrl} onImageSettingsChange={setImageSettings} />;
      case 3:
        return <AddDetails 
          caption={caption} 
          setCaption={setCaption} 
          description={description} 
          setDescription={setDescription} 
        />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mx-auto w-full min-h-screen md:p-6 bg-body-bg dark:bg-body-bg-dark">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-4 md:gap-6 h-[calc(100vh-1rem)] md:h-[calc(100vh-3rem)]">
        {/* Left Section - Preview */}
        <div className="flex-1 lg:w-1/2 lg:h-full h-1/2 w-full flex flex-col">
          <div className="flex flex-col h-full">
            <div className="mb-4 px-4 md:px-0">
              <TypeSelector
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            </div>
            <div className="flex-1 h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)] overflow-hidden rounded-xl bg-primary-bg dark:bg-primary-bg-dark shadow-lg">
              <MediaPreview 
                type={mediaType} 
                mediaUrl={mediaUrl} 
                imageSettings={imageSettings}
              />
            </div>
          </div>
        </div>

        {/* Right Section - Steps */}
        <div className="lg:w-1/2 lg:h-full h-1/2 w-full">
          <div className="bg-primary-bg dark:bg-primary-bg-dark rounded-none md:rounded-xl p-4 md:p-6 shadow-lg border-t border-b md:border border-tertiary-bg dark:border-tertiary-bg-dark h-full flex flex-col">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {/* Step Progress */}
              <div className="flex items-center mb-4 md:mb-6">
                {[...Array(maxSteps)].map((_, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base transition-all duration-300 ${
                        currentStep > index
                          ? "bg-blue-500 text-white"
                          : currentStep === index + 1
                          ? "bg-[var(--color-secondary-bg)] dark:bg-[var(--color-secondary-bg-dark)] text-blue-500 border-2 border-blue-500"
                          : "bg-[var(--color-secondary-bg)] dark:bg-[var(--color-secondary-bg-dark)] text-[var(--color-primary-text)] dark:text-[var(--color-primary-text-dark)] opacity-50"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < maxSteps - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                          currentStep > index + 1
                            ? "bg-blue-500"
                            : "bg-tertiary-bg dark:bg-tertiary-bg-dark"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step Content */}
              {renderStep()}
              {/* Navigation */}
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-600">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2.5 bg-secondary-bg dark:bg-secondary-bg-dark rounded-lg hover:bg-tertiary-bg dark:hover:bg-tertiary-bg-dark transition-colors text-primary-text dark:text-primary-text-dark"
                  >
                    Back
                  </button>
                )}
                {currentStep < maxSteps && mediaUrl && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-auto"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
