from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from plot.models import Plot

class PlotSerilizer(GeoFeatureModelSerializer):
    class Meta:
        model = Plot
        geo_field = "mpoly"
        fields = "__all__"


