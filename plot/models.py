from django.contrib.gis.db import models

class Plot(models.Model):
    shape_length = models.FloatField()
    shape_area=models.FloatField()
    owner= models.CharField(max_length=50)
    identity_number=models.IntegerField()
    contituency=models.CharField(max_length=50)
    location=models.CharField(max_length=50)
    land_reference= models.CharField(max_length=50)
    zone= models.CharField(max_length=50)
    land_use = models.CharField(max_length=50)
    ownership=models.CharField(max_length=50)
    centroid_X = models.FloatField()
    centroid_y =models.FloatField()
    paid=models.BooleanField(default=False, null=True)
    mpoly = models.MultiPolygonField()


    def __str__(self):
        return f"{self.owner} owns plot L.R {self.land_reference}"



class MpesaPayments(models.Model):

    MerchantRequestID = models.CharField(max_length=50)
    CheckoutRequestID = models.CharField(max_length=50)
    Amount = models.FloatField()
    MpesaReceiptNumber = models.CharField(max_length=50)
    TransactionDate = models.DateTimeField()
    PhoneNumber = models.CharField(max_length=16)

    class Meta:
        verbose_name_plural = 'Mpesa Payments'

    def __str__(self):
        return f"{self.MpesaReceiptNumber} received {self.Amount} receipt number {self.PhoneNumber} on {self.TransactionDate}"

    
class LandratesPayments(models.Model):
    plot = models.ForeignKey(
        'Plot', on_delete=models.CASCADE, blank=True, null=True,related_name="payments")
    mpesaTransaction = models.ForeignKey(
        'MpesaPayments', on_delete=models.CASCADE, blank=True, null=True)
    PhoneNumber = models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Payment Details'

    def __str__(self):
        return f"{self.plot.land_reference} paid"