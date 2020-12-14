from plot.mpesa import lipanampesa
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import PlotSerilizer, Plot
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from plot.models import Plot,MpesaPayments,LandratesPayments
from datetime import datetime




@api_view(['POST'])
@permission_classes((AllowAny, ))
def get_plot(request):
    if request.method == 'POST':
        if request.data['LR']:
            plot = Plot.objects.all().get(land_reference=request.data['LR'])
            plotSerializer = PlotSerilizer(plot)
            plot = Plot.objects.all().all()
            serializer = PlotSerilizer(plot,many=True)  
            return Response({
                "plot":plotSerializer.data,
                "plots":serializer.data
            })
        else:
            return Response({
                "Data":"No data Found"
            })

@api_view(['POST'])
@permission_classes((AllowAny, ))
def get_plots(request):
    if request.method == 'POST':
        plot = Plot.objects.all().all()
        serializer = PlotSerilizer(plot,many=True) 
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
def make_payments(request):
    if request.method == 'POST':
        plot = Plot.objects.get(land_reference=request.data["lr"])
        lp = LandratesPayments.objects.create(
            plot=plot,
            PhoneNumber=request.data["phoneNumber"]

        )
        lp.save()
        lipanampesa.lipa_na_mpesa(
            request.data["phoneNumber"], 1)
        return Response({"payed": False})

    return Response({"message": "Hello, world!"})


@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
def LNMtransact(request):
    if request.method == 'POST':
        Merchant_request_id = request.data["Body"]["stkCallback"]["MerchantRequestID"]
        Checkout_request_id = request.data["Body"]["stkCallback"]["CheckoutRequestID"]
        Result_code = request.data["Body"]["stkCallback"]["ResultCode"]
        Result_description = request.data["Body"]["stkCallback"]["ResultDesc"]
        if Result_code == 0:
            Amount = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][0]["Value"]
            Mpesa_receipt_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][1]["Value"]
            Transaction_date = str(
                request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][3]["Value"])
            Transaction_datetime = datetime.strptime(
                Transaction_date, "%Y%m%d%H%M%S")
            Phone_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][4]["Value"]
            landrates = LandratesPayments.objects.filter(PhoneNumber=Phone_number).order_by('-id')[0]
            if landrates.mpesaTransaction==None:
                    transaction = MpesaPayments.objects.create(
                    MerchantRequestID=Merchant_request_id,
                    CheckoutRequestID=Checkout_request_id,
                    Amount=Amount,
                    MpesaReceiptNumber=Mpesa_receipt_number,
                    TransactionDate=Transaction_datetime,
                    PhoneNumber=Phone_number)
                    transaction.save()
                    landrates.mpesaTransaction = transaction
                    landrates.save()
                    ps =Plot.objects.get(id = landrates.plot.id)
                    ps.paid = True
                    ps.save()
        return Response({"payed": True})
    else:
        print("failed")
        return Response({"payed": False})