package services

import (
	"context"
	"fmt"

	vision "cloud.google.com/go/vision/apiv1"
	"cloud.google.com/go/vision/v2/apiv1/visionpb"
)

type VisionService struct{}

func NewVisionService() *VisionService {
	return &VisionService{}
}

func (s *VisionService) AnalyzeImage(ctx context.Context, imageData []byte) ([]string, []string, error) {
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create vision client: %w", err)
	}
	defer client.Close()

	image := &visionpb.Image{
		Content: imageData,
	}

	req := &visionpb.AnnotateImageRequest{
		Image: image,
		Features: []*visionpb.Feature{
			{Type: visionpb.Feature_LABEL_DETECTION, MaxResults: 10},
			{Type: visionpb.Feature_IMAGE_PROPERTIES},
		},
	}

	resp, err := client.BatchAnnotateImages(ctx, &visionpb.BatchAnnotateImagesRequest{
		Requests: []*visionpb.AnnotateImageRequest{req},
	})
	if err != nil {
		return nil, nil, fmt.Errorf("failed to batch annotate images: %w", err)
	}

	if len(resp.Responses) == 0 {
		return nil, nil, fmt.Errorf("did not receive a response from vision api")
	}
	response := resp.Responses[0]

	if response.Error != nil {
		return nil, nil, fmt.Errorf("vision api returned an error: %v", response.Error.Message)
	}

	var tags []string
	for _, annotation := range response.LabelAnnotations {
		tags = append(tags, annotation.Description)
	}

	var colors []string
	props := response.ImagePropertiesAnnotation
	if props != nil && props.DominantColors != nil {
		for _, colorInfo := range props.DominantColors.Colors {
			hex := fmt.Sprintf("#%02x%02x%02x", int(colorInfo.GetColor().GetRed()), int(colorInfo.GetColor().GetGreen()), int(colorInfo.GetColor().GetBlue()))
			colors = append(colors, hex)
		}
	}

	return tags, colors, nil
}
